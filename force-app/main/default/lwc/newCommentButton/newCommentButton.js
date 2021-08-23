import { LightningElement } from 'lwc';

export default class NewCommentButton extends LightningElement {
    handleNew(){
        this.dispatchEvent(new CustomEvent('openmodal', {
            bubbles: true
        }))
    }
}