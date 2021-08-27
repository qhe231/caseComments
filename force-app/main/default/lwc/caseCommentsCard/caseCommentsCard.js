import { LightningElement, api, wire, track } from 'lwc'
import { NavigationMixin } from 'lightning/navigation'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getRelatedComments from '@salesforce/apex/CaseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/CaseCommentController.saveComment'
import getCaseCommentSetting from '@salesforce/apex/CaseCommentController.getCaseCommentSetting'

export default class CaseCommentsCard extends NavigationMixin(LightningElement) {
    isModalDisplayed = false
    @track numCases
    @track comments
    @api recordId

    @wire(getCaseCommentSetting)
    numCommentsToDisplay({ data, error }) {
        if (data) {
            getRelatedComments({ caseId: this.recordId })
                .then(caseComments => {
                    if (caseComments) {
                        console.log(caseComments)
                        if (caseComments.length <= data.Number_of_Comments_to_Display__c) {
                            this.numCases = caseComments.length
                            this.comments = caseComments
                        } else {
                            this.numCases = data.Number_of_Comments_to_Display__c + '+'
                            this.comments = caseComments.slice(0, data.Number_of_Comments_to_Display__c)
                        }
                    } else {
                        this.numCases = 0
                    }
                })
        }
    }

    handleCloseModal() {
        this.isModalDisplayed = false
    }

    handleSaveComment(event) {
        const comment = event.detail

        saveComment({
            caseId: this.recordId,
            commentBody: comment
        })
            .then(result => {
                if (result) {
                    this.isModalDisplayed = false

                    const toastEvent = new ShowToastEvent({
                        title: "Case comment was created.",
                        variant: "success"
                    })
                    this.dispatchEvent(toastEvent)
                }

                window.location.reload();
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