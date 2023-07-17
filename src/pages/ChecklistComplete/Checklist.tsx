import React from 'react';
import {CONFIG} from '../../config';
import {i18n} from "../../i18n";
import { RouteComponentProps, Redirect, RedirectProps, withRouter } from 'react-router';
import { LoadStatus } from '../common/types';
import { initNewChecklistData } from './utils/checklistData';
import {Api, IApi} from './../../data_sources/api';
import {IChecklistRespondent} from '../../models/ChecklistRespondent';
import { debounce } from 'debounce';
import './react_table/react-table.css';
import './react_table/react-table-custom.css';
import styles from './ChecklistStyles';
import {ChecklistHeader} from  './ChecklistHeader';
import {ChecklistInfo} from  './ChecklistInfo';
import {ChecklistFooter} from  './ChecklistFooter';
import {ChecklistEnd} from  './ChecklistEnd';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {
    withOneplaceLibraryContext, TabsComponent, QuestionGroup, IChecklistField,    
    ITabDefinition, IChecklist, IChecklistRenderProps, IChecklistGroup,
    IFranchisee, ISite, getSiteFranchiseeId, AssigneeType, IChecklistConditionalRule, 
    hasConditionApplied, isConditionalRuleShow, findChecklistGroupById, IOneplaceLibraryContextProp,
    getRenderProps, updateQuestionNumbers, validateChecklist, validateGroups, CheckCircleCustomColor
} 
from 'oneplace-components';

export interface IChecklistProps extends
    RouteComponentProps<any>,
    WithStyles<typeof styles>,
    IOneplaceLibraryContextProp{
}

export interface IChecklistState {
    api: IApi;
    region: string;
    encodedChecklistInfo: string;
    checklistInfoResponse: IChecklistInfoResponse;
    submitted: boolean;
    checklistId: number;  // 0 = not submitted, >0 = submitted
    assigneeType: AssigneeType;
    assigneeId: number;
    franchisee?: IFranchisee;
    site?: ISite;  
    checklist: IChecklist | null;
    renderProps: IChecklistRenderProps | null;
    loadStatus: LoadStatus;
    showValidationErrorDialog: boolean;
    showEmailDialog: boolean;
    showTicketDialog: boolean;
    validationErrors: string[];
    showSubmitDialog: boolean;  
    questionsNeedRefresh: boolean;
    redirectToHome: RedirectProps | null;
    incompleteFields: boolean;
    disableTabs: boolean;
}

export interface IChecklistInfoAssignments{
    franchisees: IFranchisee[] | null;
    sites: ISite [] | null;
}

export interface ISurvey{
    name: string;
    message: string;
}

export interface IChecklistInfoResponse{
    survey: ISurvey;
    messages: any;
    assignments: IChecklistInfoAssignments;
    checklist: IChecklist;    
    //when error
    success?: boolean;
    data?: string;
}

export const Checklist = withStyles(styles)(withRouter(withOneplaceLibraryContext(
    
    class extends React.Component<IChecklistProps, IChecklistState> {

        conditionalRulesList: IChecklistConditionalRule[] = [];
        debouncedSave = debounce(this.save, CONFIG.autoSaveDelay);
        respondent :IChecklistRespondent = {email: '', name: ''};

        constructor(props: IChecklistProps) {
            super(props); 
            
            const locationState = this.props.location.state as any;  
            let region = null, encodedChecklistInfo = null, checklist = null,
                checklistInfoResponse = null, selectedAssigneeId = null, assigneeType = null;
            let redirectToHome = null;
            
            //the user comes from home page
            if(locationState && locationState.checklistInfoResponse){
                region = locationState.region;
                encodedChecklistInfo = locationState.encodedChecklistInfo;
                checklistInfoResponse = locationState.checklistInfoResponse;
                selectedAssigneeId = locationState.selectedAssigneeId;
                assigneeType = locationState.assigneeType;
                checklist = checklistInfoResponse != null ? checklistInfoResponse.checklist : null
            }
            //redirect to home page if user is accessing the page directly
            else if(this.props.match.params && 
                this.props.match.params.region && this.props.match.params.path){
                 redirectToHome = this.goToHome();
            }
           
            this.state = {
                api: new Api(region, encodedChecklistInfo),
                checklistInfoResponse,
                region,
                encodedChecklistInfo, 
                submitted: false,               
                checklistId: 0,
                checklist,
                renderProps: null,
                showValidationErrorDialog: false,
                validationErrors: [],
                showSubmitDialog: false,
                incompleteFields: false,
                showEmailDialog: false,
                showTicketDialog: false,
                questionsNeedRefresh: false,
                loadStatus: 'loading',
                assigneeType,
                assigneeId: selectedAssigneeId,
                redirectToHome,
                disableTabs: false
            };
        }

        componentDidMount(){  
            if(this.state.checklistInfoResponse){
                this.initFromTemplate();  
                this.cleanLocationState(); 
            }                                
        }
        
        /*clean state to avoid user from keeping 
        at checklist page after reloading it*/
        cleanLocationState(){
            this.props.history.replace({ state: null})
        }

        goToHome = () => {
            return {                
                to: {
                    pathname: 
                        `/${this.props.match.params.region}/${this.props.match.params.path}`, 
                    state:{}
                }                
            }
        }

        async initFromTemplate() {
            try {                
                const checklistInfoResponse = this.state.checklistInfoResponse;
                const checklist = checklistInfoResponse.checklist;         

                if (this.state.assigneeType === 'franchisee') {
                    
                    const franchisee = 
                        checklistInfoResponse.assignments.franchisees!
                        .find(assignee => assignee.id === this.state.assigneeId);                    
                       
                    //initialize checklist
                    initNewChecklistData(checklist, {assigneeType: 'franchisee', franchisee});
                   
                    let renderProps = getRenderProps({
                        template: checklist,
                        assigneeType: 'franchisee',
                        assigneeAttributes: franchisee!.attributes
                    });
                    
                    //update question numbers (Q1, Q2, Q3, etc...) for conditional questions
                    renderProps = updateQuestionNumbers(checklist, renderProps!);                   
                    this.setState({ franchisee, checklist, renderProps});

                } else if (this.state.assigneeType === 'site') {

                    const site = 
                        checklistInfoResponse.assignments.sites!
                        .find(assignee => assignee.id === this.state.assigneeId);  

                    //initialize checklist
                    initNewChecklistData(checklist, {assigneeType: 'site', site});                    
                                    
                    let renderProps = getRenderProps({
                        template: checklist,
                        assigneeType: 'site',
                        assigneeAttributes: site!.attributes
                    });                   
                     
                    renderProps = updateQuestionNumbers(checklist, renderProps!);                           
                    this.setState({ site, checklist, renderProps});
                }

                this.setState({                    
                    loadStatus: 'loaded'
                });

                this.findConditionalRulesFromTemplate();
            }
            catch (e) {
                console.log(e) 
                this.setState({
                    loadStatus: 'load_error'
                });
            }            
        }            

        findConditionalRulesFromTemplate() {
            this.state.checklist!.groups.forEach((group, groupindex) => {
                group.fields.filter((f) => f.conditionalRule != null)
                            .forEach((field) => this.conditionalRulesList.push(field.conditionalRule!));
            });
        }

        // are we going to save locally?
        async save() {           
            const checklist = this.state.checklist!;            
            validateGroups(checklist, this.state.renderProps!);
            this.setState({ renderProps: this.state.renderProps, disableTabs: false });
        }

        onChecklistChanged = () => {
            // checklist is locked, don't save change
            if (this.state.checklist!.locked) return;    
            
            this.setState({ disableTabs: true });
            this.debouncedSave();
        }

        validateConditionalQuestion = (newValue: string, question: IChecklistField | null) => {
            if (question == null) {
                // no conditional question change, don't need to refresh page
                this.setState({
                    questionsNeedRefresh: false
                });
                return;
            }
            const filteredConditionalRules: IChecklistConditionalRule[] = [];
            question.conditions!.forEach((conditionId) => {
                this.conditionalRulesList.forEach((conditionRule, conditionalRuleIdx) => {
                    conditionRule.conditions!.forEach((condition, conditionIdx) => {
                        if (condition.id === conditionId){
                            condition.applied = hasConditionApplied(newValue, question, condition);
                            if (filteredConditionalRules.indexOf(conditionRule) < 0){
                                filteredConditionalRules.push(conditionRule);
                            }
                        }
                    });
                });
            });
            filteredConditionalRules.forEach((conditionalRule) => {
                this.refreshConditionalRuleAndSubQuestions(conditionalRule);
            });
            // update question number
            const renderProps = updateQuestionNumbers(this.state.checklist!, this.state.renderProps!);
            this.setState({
                questionsNeedRefresh: filteredConditionalRules.length > 0,
                renderProps
            });
        }

        refreshConditionalRuleAndSubQuestions = (conditionalRule: IChecklistConditionalRule) => {
            const currentGroup = findChecklistGroupById(conditionalRule.groupId, this.state.checklist!);
            const showFieldFlag = isConditionalRuleShow(conditionalRule, this.conditionalRulesList);
            currentGroup!.fields.forEach((field) => {
                if (conditionalRule.conditionalQuestions.includes(field.id)){
                    field.hidden = !showFieldFlag;
                    if (field.type === 'conditionalRule') {
                        this.refreshConditionalRuleAndSubQuestions(field.conditionalRule!);
                    }
                }
            });
        }

        onChecklistSubmit = async () => {            
            const errors = validateChecklist(this.state.checklist!, this.state.renderProps!, i18n.t.bind(i18n));
            if (errors && errors.length) {
                const errStrings = errors.map((error: any) => error.errorText);
                this.setState({
                    showValidationErrorDialog: true,
                    validationErrors: errStrings
                });
                return;
            }
            else {
                let showIncompleteFields =false
                this.state.renderProps?.groups.forEach((group ) => {
                    if (group.incompleteFields) {
                        showIncompleteFields = true
                    }
                })
                this.setState({ showSubmitDialog: true,
                    incompleteFields: showIncompleteFields
                });
            }
        }

        onChecklistSubmitted = async (checklistId: number) => {      
            let newChecklist = Object.assign({}, this.state.checklist); 
            newChecklist.id = checklistId;
            this.setState({ checklist: newChecklist, checklistId});
        }

        onSubmitDialogsCompleted = async () => {            
            // re-initialise UI after submit dialog(s) have finished            
            await new Promise<void>((resolve) => {
                this.setState({                   
                    loadStatus: 'loading',
                    submitted: true
                }, () => {
                    resolve();
                });
            });            
        }

        showEmailDialog = () => {
            this.setState({ showEmailDialog: true });
        }                
       
        render() {       

            const t = (key: string)=>{return this.props.ctx.i18next.t(key)};            

            if (!this.state.submitted && this.state.loadStatus === 'loaded') {

                const checklist = this.state.checklist!;
                const franchiseeId = this.state.assigneeType === 'franchisee'
                    ? this.state.franchisee!.id : getSiteFranchiseeId(this.state.site!);               

                let content;

                if(checklist.useTabs){

                    const groupsToShow: IChecklistGroup[] = [];
                    
                    checklist.groups.forEach((group, index) => {
                        if (this.state.renderProps!.groups[index].showTab) {
                            groupsToShow.push(group);
                        }
                    });

                    const tabs: ITabDefinition[] = groupsToShow.map((group, index) => {
                        // group index is the index in complete groups list
                        // includes show and hidden groups
                        let groupIndex = 0;
                        for (let i = 0; i < checklist.groups.length; i++){
                            if (checklist.groups[i].id === group.id){
                                groupIndex = i;
                                break;
                            }
                        }

                        const renderProps = this.state.renderProps!.groups[groupIndex];

                        return {
                            name: 'group_' + index,
                            label: <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {group.label}
                                    {!renderProps.incompleteFields &&
                                        <CheckCircleCustomColor
                                          size={20}
                                          background="#ff5983"
                                          color="#ffffff"
                                     />
                                    }
                                </div>,
                            component: <QuestionGroup
                                groupIndex={index}
                                group={group}                    
                                renderProps={renderProps!}                    
                                dateTimeFormat={t('dateTimeFormat')}
                                dateFormat={t('dateFormat')}
                                onFieldChange={this.onChecklistChanged}
                                onTicketPreset={()=>{}}
                                validateConditionalQuestion={this.validateConditionalQuestion}
                                questionsNeedRefresh={this.state.questionsNeedRefresh}
                                hideGroupPhotos={checklist.hideGroupPhotos}
                                hideQuestionNumber={checklist.hideQuestionNumber}
                                disableTabLinks={this.state.disableTabs}
                            />
                        };
                    });

                    content = 
                    <TabsComponent
                        color="light"
                        compact={true}
                        tabs={tabs}
                        rememberScrollPosition={true}
                        initialTabIdx={0}
                        hasDetailsTab={false}
                        disabled={this.state.disableTabs}
                    />                   
                } 
                //no tabs
                else {                    
                    content = checklist.groups.map((group, index) => {
                        const renderProps = this.state.renderProps!.groups[index];
                        return (
                            renderProps.showTab && <div key={group.id}>
                                <Typography variant="h5" className={this.props.classes.groupHeader}>
                                    {group.label}
                                </Typography>
                                <QuestionGroup
                                    groupIndex={index}
                                    group={group}                                        
                                    renderProps={renderProps}
                                    onFieldChange={this.onChecklistChanged}
                                    onTicketPreset={()=>{}}
                                    validateConditionalQuestion={this.validateConditionalQuestion}
                                    questionsNeedRefresh={this.state.questionsNeedRefresh}
                                    dateTimeFormat={t('dateTimeFormat')}
                                    dateFormat={t('dateFormat')}
                                    hideGroupPhotos={checklist.hideGroupPhotos}
                                    hideQuestionNumber={checklist.hideQuestionNumber}
                                    disableTabLinks={this.state.disableTabs}
                                />
                            </div>
                        );
                    })                   
                }

                return (
                    <>
                        <ChecklistHeader onSubmitChecklist={this.onChecklistSubmit} />
                        <div id="checklist" className={this.props.classes.appWrapper}>                                
                            <ChecklistInfo 
                                surveyName={this.state.checklistInfoResponse.survey.name} 
                                assignee={this.state.assigneeType}
                                franchisee={this.state.franchisee} 
                                site={this.state.site}
                            />
                            {content}                        
                            <ChecklistFooter 
                                encodedChecklistInfo={this.state.encodedChecklistInfo}
                                isSubmitDialogOpen={this.state.showSubmitDialog}
                                api={this.state.api}                                
                                checklistInfoResponse={this.state.checklistInfoResponse}                            
                                respondent={this.respondent}
                                assigneeType={this.state.assigneeType}
                                franchisee={this.state.franchisee}
                                site={this.state.site}
                                onCloseSubmitDialog={() => {this.setState({ showSubmitDialog: false });}}
                                onChecklistSubmitted={this.onChecklistSubmitted}
                                onSubmitDialogsCompleted={this.onSubmitDialogsCompleted}                            
                                errorsShown={this.state.showValidationErrorDialog}
                                errors={this.state.validationErrors}
                                onErrorsDismissed={() => {this.setState({ showValidationErrorDialog: false });}}
                                showEmailDialog={this.showEmailDialog}
                                isShowEmailDialog={this.state.showEmailDialog} 
                                incompleteFields= {this.state.incompleteFields}
                                franchiseeId={franchiseeId}
                                onCloseEmailDialog={() => {this.setState({showEmailDialog: false})}}
                            />
                        </div>
                    </>
                )
            } 
            else if(this.state.submitted){
                const url = "/" + this.props.match.params.region + "/"  + this.props.match.params.path
                return <ChecklistEnd checklistName={this.state.checklistInfoResponse.survey.name}
                    surveyLink={url} />
            } 
            else if(this.state.redirectToHome){
                return  <Redirect {...this.state.redirectToHome} />
            }

            return null;
        }

})));

