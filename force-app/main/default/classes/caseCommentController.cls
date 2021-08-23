public with sharing class caseCommentController {
	@AuraEnabled(cacheable=true)
	public static List<CaseComment> getRelatedComments(Id caseId){
		try {
			return [
				SELECT CreatorName, CreatedDate, CommentBody
				FROM CaseComment
				WHERE ParentId = : caseId
				                 WITH SECURITY_ENFORCED
				                 ORDER BY CreatedDate DESC
			];
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}
