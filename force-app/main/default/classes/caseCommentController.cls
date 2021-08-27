public with sharing class CaseCommentController {
	@AuraEnabled(cacheable=true)
	public static List<CaseComment> getRelatedComments(Id caseId){
		List<CaseComment> caseComments = [
			SELECT Id, CreatedBy.Name, CreatedDate, CommentBody
			FROM CaseComment
			WHERE ParentId = :caseId
			                 WITH SECURITY_ENFORCED
			                 ORDER BY CreatedDate DESC
		];
		return caseComments;
	}

	@AuraEnabled(cacheable=false)
	public static CaseComment saveComment(Id caseId, String commentBody){
		CaseComment cc = new CaseComment();
		cc.ParentId = caseId;
		cc.CommentBody = commentBody;
		cc.IsPublished = true;
		insert cc;
		return cc;
	}

	@AuraEnabled(cacheable=true)
	public static Case_Comment_Setting__mdt getCaseCommentSetting(){
		return Case_Comment_Setting__mdt.getInstance('Experience_Site');
	}
}