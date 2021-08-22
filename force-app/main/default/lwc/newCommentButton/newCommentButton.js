import { LightningElement } from 'lwc';

export default class NewCommentButton extends LightningElement {
    handleNew(event){
        this.dispatchEvent(new CustomEvent('openModal', {
            bubbles: true
        }))
    }
}