import { LightningElement, api, wire, track } from 'lwc'
import { NavigationMixin } from 'lightning/navigation'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getRelatedComments from '@salesforce/apex/CaseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/CaseCommentController.saveComment'
import getCaseCommentSetting from '@salesforce/apex/CaseCommentController.getCaseCommentSetting'

export default class CaseCommentsCard extends NavigationMixin(LightningElement) {
    isNewCommentModalDisplayed = false
    isAllCommentsModalDisplayed = false
    @track numCases
    @track commentsOnCard
    @track allComments
    @api recordId

    @wire(getCaseCommentSetting)
    numCommentsToDisplay({ data, error }) {
        if (data) {
            getRelatedComments({ caseId: this.recordId })
                .then(caseComments => {
                    if (caseComments) {
                        this.allComments = caseComments;
                        if (caseComments.length <= data.Number_of_Comments_to_Display__c) {
                            this.numCases = caseComments.length
                            this.commentsOnCard = caseComments
                        } else {
                            this.numCases = data.Number_of_Comments_to_Display__c + '+'
                            this.commentsOnCard = caseComments.slice(0, data.Number_of_Comments_to_Display__c)
                        }
                    } else {
                        this.numCases = 0
                    }
                })
        }
    }

    handleCloseModal(event) {
        if (event.detail === 'new') {
            this.isNewCommentModalDisplayed = false
        } else if (event.detail === 'all') {
            this.isAllCommentsModalDisplayed = false
        }
    }

    handleSaveComment(event) {
        const comment = event.detail

        saveComment({
            caseId: this.recordId,
            commentBody: comment
        })
            .then(result => {
                if (result) {
                    this.isNewCommentModalDisplayed = false

                    const toastEvent = new ShowToastEvent({
                        title: "Case comment was created.",
                        variant: "success"
                    })
                    this.dispatchEvent(toastEvent)
                }

                window.location.reload();
            })
    }

    handleOpenModal(event) {
        if (event.detail === 'new') {
            this.isNewCommentModalDisplayed = true
        } else if (event.target.name === 'viewAll'){
            this.isAllCommentsModalDisplayed = true
        }
    }
}