import { LightningElement, api } from 'lwc';

export default class AllCommentsModal extends LightningElement {
    @api comments

    handleClose() {
        this.commentBody = undefined
        this.dispatchEvent(new CustomEvent('closemodal', {
            bubbles: true,
            detail: 'all'
        }))
    }
}