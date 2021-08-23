import { LightningElement } from 'lwc'
import USER_FIELD from '@salesforce/schema/CaseComment.CreatedById'
import CREATED_DATE_FIELD from '@salesforce/schema/CaseComment.CreatedDate'
import BODY_FIELD from '@salesforce/schema/CaseComment.commentBody'

const COLUMNS = [
    { label: 'User', fieldName: USER_FIELD.fieldApiName, type: 'text' },
    { label: 'Created Date', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'datetime' },
    { label: 'Comment', fieldName: BODY_FIELD.fieldApiName, type: 'text' }
]

export default class CaseCommentsTable extends LightningElement {
    columns = COLUMNS
    caseComments
}