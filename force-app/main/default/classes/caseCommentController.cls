public with sharing class CaseCommentController {
	@AuraEnabled(cacheable=true)
	public static List<CaseComment> getRelatedComments(Id caseId){
		try {
			List<CaseComment> caseComments = [
				SELECT Id, CreatedBy.Name, CreatedDate, CommentBody
				FROM CaseComment
				WHERE ParentId = :caseId
				                 WITH SECURITY_ENFORCED
				                 ORDER BY CreatedDate DESC
			];
			return caseComments;
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled(cacheable=false)
	public static CaseComment saveComment(Id caseId, String commentBody){
		try {
			CaseComment cc = new CaseComment();
			cc.parentId = caseId;
			cc.commentBody = commentBody;
			cc.isPublished = true;
			insert cc;
			return cc;
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled(cacheable=true)
	public static Decimal getNumCommentsToDisplay(){
		try {
			Case_Comment_Setting__mdt ccs = Case_Comment_Setting__mdt.getInstance('Experience_Site');
            return ccs.Number_of_Comments_to_Display__c;

		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}