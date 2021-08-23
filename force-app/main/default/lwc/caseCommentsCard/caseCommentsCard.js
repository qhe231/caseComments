import { LightningElement, api, wire } from 'lwc'
import getRelatedComments from '@salesforce/apex/CaseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/CaseCommentController.saveComment'

import USER_FIELD from '@salesforce/schema/CaseComment.CreatedById'
import CREATED_DATE_FIELD from '@salesforce/schema/CaseComment.CreatedDate'
import BODY_FIELD from '@salesforce/schema/CaseComment.commentBody'

const COLUMNS = [
    { label: 'User', fieldName: USER_FIELD.fieldApiName, type: 'text' },
    { label: 'Created Date', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'datetime' },
    { label: 'Comment', fieldName: BODY_FIELD.fieldApiName, type: 'text' }
]

export default class CaseCommentsCard extends LightningElement {
    isModalDisplayed = false
    numCase = 0
    columns = COLUMNS

    @api recordId
    @wire(getRelatedComments, { caseId: '$recordId' }) caseComments

    handleCloseModal() {
        this.isModalDisplayed = false

    }

    handleSaveComment(event) {
        const comment = event.body
        saveComment({
            caseId: '$recordId',
            commentBody: comment
        })
    }

    handleOpenModal() {
        this.isModalDisplayed = true
    }

}