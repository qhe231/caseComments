public with sharing class caseCommentController {
	@AuraEnabled(cacheable=true)
	public static List<CaseComment> getRelatedComments(Id caseId){
		try {
			return [
				SELECT CreatedById, CreatedDate, CommentBody
				FROM CaseComment
				WHERE ParentId = : caseId
				                 WITH SECURITY_ENFORCED
				                 ORDER BY CreatedDate DESC
			];
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

    @AuraEnabled(cacheable=true)
    public static CaseComment saveComment(Id caseId, String commentBody){
        try {
            CaseComment cc = new CaseComment();
            cc.parentId = caseId;
            cc.commentBody = commentBody;

            insert cc;

            return cc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
