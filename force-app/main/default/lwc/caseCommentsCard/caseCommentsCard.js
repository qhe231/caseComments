import { LightningElement, api, wire, track } from 'lwc'
import { NavigationMixin } from 'lightning/navigation'
import getRelatedComments from '@salesforce/apex/CaseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/CaseCommentController.saveComment'

/* import USER_FIELD from '@salesforce/schema/CaseComment.CreatedById'
import CREATED_DATE_FIELD from '@salesforce/schema/CaseComment.CreatedDate'
import BODY_FIELD from '@salesforce/schema/CaseComment.CommentBody'

const COLUMNS = [
    { label: 'User', fieldName: USER_FIELD.fieldApiName, type: 'text' },
    { label: 'Created Date', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'datetime' },
    { label: 'Comment', fieldName: BODY_FIELD.fieldApiName, type: 'text' }
] */

export default class CaseCommentsCard extends NavigationMixin(LightningElement) {
    isModalDisplayed = false
    // columns = COLUMNS
    numCases = 0

    @api recordId
    @wire(getRelatedComments, { caseId: '$recordId' })
    caseComments

    handleCloseModal() {
        this.isModalDisplayed = false
    }

    handleSaveComment(event) {
        const comment = event.detail

        saveComment({
            caseId: this.recordId,
            commentBody: comment
        })
    }

    handleOpenModal() {
        this.isModalDisplayed = true
    }

    navigateToCaseComments() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Case',
                relationshipApiName: 'CaseComments',
                actionName: 'view'
            }
        })
    }

}