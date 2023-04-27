import { Dialog, DialogContent } from '@material-ui/core'
// import loadingImage from '../../images/loading.png'

interface ILoadingProps {
    loading: boolean
}
const Loading = (props: ILoadingProps) => {
    return (
        <Dialog open={props.loading}>
            <DialogContent>
                <img src="" alt="Loading" />
            </DialogContent>
        </Dialog>
    )
}
export default Loading
