import { LightningElement, api, wire, track } from 'lwc'
import { NavigationMixin } from 'lightning/navigation'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { refreshApex } from '@salesforce/apex'
import getRelatedComments from '@salesforce/apex/CaseCommentController.getRelatedComments'
import saveComment from '@salesforce/apex/CaseCommentController.saveComment'

export default class CaseCommentsCard extends NavigationMixin(LightningElement) {
    isModalDisplayed = false
    @track numCases = 0
    @track comments

    @api recordId
    @wire(getRelatedComments, { caseId: '$recordId' })
    caseComments({ data, error }) {
        if (data) {
            if (data.length <= 6) {
                this.numCases = data.length
                this.comments = data
            } else {
                this.numCases = '6+'
                this.comments = data.slice(0, 6)
            }
        } else {
            this.numCases = 0
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