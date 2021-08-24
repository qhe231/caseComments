import { LightningElement } from 'lwc';

export default class NewCommentModal extends LightningElement {
    commentBody

    handleClose() {
        this.commentBody = undefined
        this.dispatchEvent(new CustomEvent('closemodal', {
            bubbles: true
        }))
    }

    handleChange(event) {
        this.commentBody = event.target.value
    }

    handleSave() {
        this.dispatchEvent(new CustomEvent('savecomment', {
            bubbles: true,
            detail: this.commentBody
        }))
    }

}