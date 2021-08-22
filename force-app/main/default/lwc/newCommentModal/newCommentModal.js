import UserPreferencesRecordHomeSectionCollapseWTShown from '@salesforce/schema/User.UserPreferencesRecordHomeSectionCollapseWTShown';
import { LightningElement } from 'lwc';

export default class NewCommentModal extends LightningElement {
    commentBody

    handleClose(event){
        this.commentBody = undefined
        this.dispatchEvent(new CustomEvent('closeModal',{
            bubbles: true
        }))
    }

    handleChange(event){
        this.commentBody = event.target.value
    }
    
    handleSave(event){
        this.dispatchEvent(new CustomEvent('saveComment',{
            bubbles: true,
            body: this.commentBody
        }))
    }

}