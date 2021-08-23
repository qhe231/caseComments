import { LightningElement, api, wire } from 'lwc'
import getRelatedComments from '@salesforce/apex/caseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/caseCommentController.saveComment'

export default class CaseCommentsCard extends LightningElement {
    isModalDisplayed = false
    numCase = 0
    @api recordId
    @wire(getRelatedComments, {
        caseId: '$recordId'
    })
    caseComments


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