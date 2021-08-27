@isTest(SeeAllData=true)
public class CaseCommentControllerTest {

	@isTest static void testGetNoRelatedComments(){
		Id caseId = createMockCase();
		List<CaseComment> caseComments =
			CaseCommentController.getRelatedComments(caseId);

		System.assertEquals(0, caseComments.size());
	}

	@isTest static void testGetRelatedComments(){
		Id caseId = createMockCase();
		for (Integer i = 0; i < 3; i++) {
			createMockCaseComment(caseId, i);
		}

		List<CaseComment> caseComments =
			CaseCommentController.getRelatedComments(caseId);

		System.assertEquals(3, caseComments.size());

		for (Integer i = 0; i < 3; i++) {
			System.assertEquals('Test '+ i, caseComments[i].CommentBody);
		}
	}

	@isTest static void testSaveComment(){
		Id caseId = createMockCase();
		CaseComment cc = CaseCommentController.saveComment(caseId, 'Test Comment');

		CaseComment cc2 = [
			SELECT Id, ParentId, CommentBody, IsPublished
			FROM CaseComment
			WHERE Id = :cc.Id
		];

		System.assertEquals(caseId, cc.parentId);
		System.assertEquals('Test Comment', cc.CommentBody);
		System.assert (cc.IsPublished);

		System.assertEquals(caseId, cc2.parentId);
		System.assertEquals('Test Comment', cc2.CommentBody);
		System.assert (cc2.IsPublished);
	}

	@isTest static void testGetCaseCommentSetting(){
		Case_Comment_Setting__mdt ccs = CaseCommentController.getCaseCommentSetting();
		System.assertNotEquals(null, ccs);
	}

	private static Id createMockCase(){
		Case c =  new Case(Status='New', Origin='Web', Subject='Test Case');
		insert c;
		return c.Id;
	}

	private static void createMockCaseComment(Id caseId, Integer i){
		CaseComment cc = new CaseComment();
		cc.ParentId = caseId;
		cc.CommentBody = 'Test '+ i;
		cc.IsPublished = true;
		insert cc;
	}
}
