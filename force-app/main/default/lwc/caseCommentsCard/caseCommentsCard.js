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
    @track numCasesPerPage
    @track commentsOnCard
    @track allComments
    @track numPages
    @track pageNum
    @api recordId

    @wire(getCaseCommentSetting)
    numCommentsToDisplay({ data, error }) {
        if (data) {
            getRelatedComments({ caseId: this.recordId })
                .then(caseComments => {
                    if (caseComments) {
                        this.allComments = caseComments
                        this.pageNum = 1
                        this.numCases = caseComments.length
                        this.numCasesPerPage = data.Number_of_Comments_to_Display__c
                        if (this.numCases <= this.numCasesPerPage) {
                            this.commentsOnCard = caseComments
                            this.numPages = 1
                        } else {
                            this.commentsOnCard = caseComments.slice(0, this.numCasesPerPage)
                            this.numPages = Math.ceil(this.numCases / this.numCasesPerPage)
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
        } else if (event.target.name === 'viewAll') {
            this.isAllCommentsModalDisplayed = true
        }
    }

    handlePrev() {
        if (this.pageNum > 1) {
            this.pageNum -= 1
            this.commentsOnCard =
                this.allComments.slice(this.numCasesPerPage * (this.pageNum - 1), this.numCasesPerPage * this.pageNum)
        }
    }

    handleNext() {
        if (this.pageNum < this.numPages) {
            this.pageNum += 1
            if (this.pageNum === this.numPages) {
                this.commentsOnCard =
                    this.allComments.slice(this.numCasesPerPage * (this.pageNum - 1), this.numCases)
            } else {
                this.commentsOnCard =
                    this.allComments.slice(this.numCasesPerPage * (this.pageNum - 1), this.numCasesPerPage * this.pageNum)
            }
        }

    }
}