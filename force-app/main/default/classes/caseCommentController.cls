public with sharing class CaseCommentController {
	@AuraEnabled(cacheable=true)
	public static List<CaseComment> getRelatedComments(Id caseId){
		try {
            List<CaseComment> caseComments = [
				SELECT Id, CreatedById, CreatedDate, CommentBody
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
}