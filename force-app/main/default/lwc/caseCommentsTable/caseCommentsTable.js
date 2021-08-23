import { LightningElement, wire, api } from 'lwc'
import USER_FIELD from '@salesforce/schema/CaseComment.User'
import CREATED_DATE_FIELD from '@salesforce/schema/CaseComment.CreatedDate'
import BODY_FIELD from '@salesforce/schema/CaseComment.commentBody'
import getRelatedComments from '@salesforce/apex/caseCommentController.getRelatedComments'

const COLUMNS = [
    { label: 'User', fieldName: USER_FIELD.fieldApiName, type: 'text' },
    { label: 'Created Date', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'datetime' },
    { label: 'Comment', fieldName: BODY_FIELD.fieldApiName, type: 'text' }
]

export default class CaseCommentsTable extends LightningElement {
    @api recordId
    columns = COLUMNS
    @wire(getRelatedComments, {
        caseId: this.recordId
    })
    caseComments
}