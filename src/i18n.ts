import * as i18next from 'i18next'

export interface Ii18nHelper {
    initialise(): Promise<void>
    t(key: string, values?: any): any
    changeLang(lang: string): Promise<void>
    addTranslations(ns: string, messages: any): void
}

export class I18nHelper implements Ii18nHelper {
    _instance: i18next.i18n = null as any
    _t: i18next.TFunction = null as any

    initialise() {
        return new Promise<void>((resolve, reject) => {
            if (this._instance) {
                //throw new Error('i18n already initialised!!');
            }
            this._instance = i18next.createInstance()
            this._instance.init(
                {
                    lng: 'en',
                    debug: true,
                    fallbackLng: 'en',
                    ns: ['common'],
                    defaultNS: 'common',
                    interpolation: {
                        escapeValue: false, // not needed for react
                    },
                    resources: {
                        en: {
                            common: {
                                ok: 'OK',
                                save: 'Save',
                                delete: 'Delete',
                                cancel: 'Cancel',
                                clear: 'Clear',
                                new_photo_comment: 'Add Photo Comment',
                                signature: 'Signature',
                                start_timer: 'Start Timer',
                                start_break: 'Start Break',
                                stop_break: 'Finish Break',
                                stop_timer: 'Stop Timer',
                                ticked: 'Ticked',
                                not_ticked: 'Not Ticked',
                                previous: 'Previous',
                                next: 'Next',
                                row: 'Row',
                                add_row: 'Add Row',
                                saving: 'Saving...',
                                comment: 'Comment',
                                photos: 'Photos',
                                take_a_photo: 'Take a Photo',
                                select_from_gallery: 'Select from Gallery',
                                add_signature: 'Add Signature',
                                dynamic_datagrid_delete_label: 'Delete',
                                dynamic_datagridlist_delete_label:
                                    'Delete List',
                                dynamic_datagridlist_add_label: 'Add List',
                                initial_photo_comment: 'Initial Photo Comment',
                                select: 'Select',
                                search: 'Search',
                                photo_comment: 'Photo Comment',
                                gallery: 'Group Photos',
                                add_gallery_photo: 'Add Group Photo',
                                validation_errors: 'Validation Errors',
                                please_correct_the_following:
                                    'Please correct the following:',
                                submit: 'Submit',
                                submitting: 'Submitting...',
                                checklist: 'Survey',
                                checklist_name: 'Name',
                                checklist_toemail: 'Send a copy to my email',
                                submit_checklist: 'Submit Survey',
                                submit_checklist_intro: 'Submit this survey?',
                                submit_success: 'Survey Submitted Successfully',
                                submit_failed:
                                    'Submitting the survey failed due to the following problem(s)',
                                submit_error:
                                    'There was an error sending the survey.',
                                retry_submission: 'Retry Submission',
                                continue_editing: 'Continue Editing',
                                email_checklist: 'Email',
                                unanswered_questions: 'Unanswered Questions',
                                email_to: 'To:',
                                send_email: 'Send Email',
                                email_process_error:
                                    'Unfortunately there was a problem creating or sending the email.',
                                email_sent_successfully:
                                    'Email sent successfully',
                                error_must_enter_value_for:
                                    'You must enter a value for "{{field}}" under "{{tab}}"',
                                error_must_enter_comment_for:
                                    'You must enter a comment for "{{field}}" under "{{tab}}"',
                                error_must_attach_photo_for:
                                    'You must attach a photo for "{{field}}" under "{{tab}}"',
                                error_must_attach_file_for:
                                    'You must attach a file for "{{field}}" under "{{tab}}"',
                                error_must_enter_grid_value_for:
                                    'Value missing for "{{gridField}}" in grid "{{field}}", under "{{tab}}"',
                                error_must_enter_grid_comment_for:
                                    'Comment missing for "{{gridField}}" in grid "{{field}}", under "{{tab}}"',
                                error_must_attach_grid_photo_for:
                                    'Photo missing for "{{gridField}}" in grid "{{field}}", under "{{tab}}"',
                                error_must_attach_grid_file_for:
                                    'File missing for "{{gridField}}" in grid "{{field}}", under "{{tab}}"',
                                error_must_enter_number_for:
                                    'You must enter a number for "{{field}}"',
                                question_help: 'Help',
                                question_help_image: 'Help Image',
                                question_photo: 'Add Photo',
                                question_attachment: 'Upload File',
                                question_comment: 'Add Comment',
                                franchisee_alias:
                                    '$t(customLabel_franchisee) Alias',
                                site_alias: '$t(customLabel_site) Alias',
                                current_schedules: 'Current schedules',
                                actions: 'Actions',
                                checklist_temp: 'Checklist Templates',
                                health_and_safety: 'Health & Safety',
                                new_checklist_temp:
                                    'Create new checklist template in this folder',
                                new_temp: 'New Template',
                                start: 'Start',
                                edit: 'Edit',
                                more: 'More',
                                schedule: 'Schedule',
                                survey: 'Survey',
                                versions: 'Versions',
                                settings: 'Settings',
                                copy: 'Copy',
                                deactivate: 'Deactivate',
                                activate: 'Activate',
                                print_pdf: 'Print PDF',
                                sched_and_survey: 'Schedules & Surveys',
                                form_sched_for: 'Form Schedules for',
                                new_sched_caption:
                                    'Create new schedule in this folder',
                                new_sched: 'New schedule',
                                sched_name: 'Schedule Name',
                                start_date: 'Start Date',
                                show_when_overdue: 'Show when Overdue',
                                sched_frequency: 'Schedule Frequency',
                                for: 'For',

                                sched_for: 'Schedule For',
                                use_franchisee_alias:
                                    'Use Franchisee Alias to Select Franchisees',
                                select_franchisees: 'Select Franchisees',
                                recurrence: 'Recurrence',
                                every_x_weeks_months:
                                    "Every 'x' Weeks / Months",
                                end: 'End',
                                save_and_new_sched: 'Save and new Schedule',
                                select_an_opt: 'Select an option',
                                edit_sched: 'Edit Schedule',
                            },
                        },
                    },
                },
                (err, t) => {
                    if (err) {
                        reject(err)
                    } else {
                        this._t = t
                        resolve()
                    }
                }
            )
        })
    }

    t = (key: string, values?: any) => {
        return this._t(key, values)
    }

    async changeLang(lang: string) {
        return new Promise<void>((resolve, reject) => {
            this._instance.changeLanguage(lang, (err, t) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    addTranslations(ns: string, messages: any) {
        this._instance.addResourceBundle(
            this._instance.language,
            ns,
            messages,
            true,
            true
        )
    }

    // mockT() {
    //     this._t = (key: string | string[], values?: any) => {
    //         return values ? key + ' ' + JSON.stringify(values) : key
    //     }
    // }
}

export const i18n = new I18nHelper()
