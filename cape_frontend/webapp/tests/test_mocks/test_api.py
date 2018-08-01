import pytest
import requests
import hashlib

from cape_frontend.webapp.tests.tests_settings import UI_URL
from cape_api_helpers.text_responses import *
from cape_frontend.webapp.mocks import mock_data

MOCK_FULL_BASE_URL = UI_URL+'/mock/full/api/0.1'
MOCK_UNLUCKY_BASE_URL = UI_URL + '/mock/unlucky/api/0.1'
MOCK_ERROR_BASE_URL = UI_URL+'/mock/error/api/0.1'
MOCK_TIMEOUT_BASE_URL = UI_URL+'/mock/timeout/api/0.1'

def test_mock_full():
    session = requests.Session()
    response = session.get(MOCK_FULL_BASE_URL + '/user/login?login=bla&password=blu')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['message'] == VALID_CREDENTIALS_TEXT
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-user-token')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['userToken'] == mock_data.user_token
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/get-inbox')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/get-inbox?answered=true')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/get-inbox?read=true')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/get-inbox?searchTerm=How')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/mark-inbox-read?inboxId=123')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['inboxId'] == "123"
    response = session.get(MOCK_FULL_BASE_URL + '/inbox/archive-inbox?inboxId=111')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['inboxId'] == "111"
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/get-saved-replies')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/get-saved-replies?searchTerm=old')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/add-saved-reply?question=Test&answer=Testing')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'replyId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/add-paraphrase-question?replyId=14&question=Test2')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/edit-paraphrase-question?questionId=14&question=Test3')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/edit-canonical-question?replyId=14&question=Test4')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'replyId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/delete-paraphrase-question?questionId=14')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/add-answer?replyId=14&answer=Testing2')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/edit-answer?answerId=14&answer=Testing3')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/delete-answer?answerId=14')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/saved-replies/delete-saved-reply?replyId=14')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['replyId'] == "14"
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/get-annotations')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/get-annotations?searchTerm=old')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/get-annotations?pages=1,2,3')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/get-annotations?pages=5,6')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/add-annotation?question=Test&answer=Testing'
                                                '&documentId=test&startOffset=0&endOffset=12')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'annotationId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/add-paraphrase-question?annotationId=testid&question=Test2')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/edit-paraphrase-question?questionId=test&question=Test3')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/edit-canonical-question?annotationId=testid&question=Test4')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'annotationId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/delete-paraphrase-question?questionId=testid')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'questionId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/add-answer?annotationId=testid&answer=Testing2')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/edit-answer?answerId=testid&answer=Testing3')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/delete-answer?answerId=testid')
    assert response.status_code == 200
    assert response.json()['success'] == True and 'answerId' in response.json()['result']
    response = session.get(MOCK_FULL_BASE_URL + '/annotations/delete-annotation?annotationId=testid')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['annotationId'] == "testid"
    response = session.get(MOCK_FULL_BASE_URL + '/documents/get-documents')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 30
    response = session.get(MOCK_FULL_BASE_URL + '/documents/get-documents?documentIds=custom_id_2')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/documents/get-documents?searchTerm=API')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/documents/add-document?title=Test&text=hello&origin=test.txt')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['documentId'] == hashlib.sha256(b'hello').hexdigest()
    response = session.get(MOCK_FULL_BASE_URL + '/documents/delete-document?documentId=custom_id_2')
    assert response.status_code == 200
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-default-threshold')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['threshold'] == 'medium'
    response = session.get(MOCK_FULL_BASE_URL + '/user/set-default-threshold?threshold=high')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['threshold'] == 'high'
    response = session.get(MOCK_FULL_BASE_URL + '/user/set-default-threshold?threshold=superduperhigh')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_FULL_BASE_URL + '/user/set-forward-email?email=test@bloomsbury.ai')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['forwardEmail'] == 'test@bloomsbury.ai'
    response = session.get(MOCK_FULL_BASE_URL + '/user/verify-forward-email?verifiedEmailToken=a0uv98ahe')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['forwardEmail'] == 'sample@mail.com'
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-profile')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['username'] == mock_data.username
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-admin-token')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['adminToken'] == mock_data.admin_token
    response = session.post(MOCK_FULL_BASE_URL + '/saved-replies/get-saved-replies', "{\"savedReplyIds\":[\"d27a7812-c3c3-11e7-8d29-d15d28ee5381\"]}")
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/user/logout')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['message'] == LOGGED_OUT_TEXT
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-user-token')
    assert response.status_code == 500
    response.json()['success'] == False and response.json()['result']['message'] == NOT_LOGGED_TEXT
    response = session.get(MOCK_FULL_BASE_URL + '/user/get-user-token?adminToken=test')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['userToken'] == mock_data.user_token
    response = session.get(MOCK_FULL_BASE_URL + '/answer?token=blah&question=Is this API easy to use?')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.get(MOCK_FULL_BASE_URL + '/answer?token=blah&question=Is this API easy to use?&numberOfItems=2')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 2
    response = session.get(MOCK_FULL_BASE_URL + '/answer?token=blah&question=Is this API easy to use?&documentsOnly=true&numberOfItems=2')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 2
    response = session.get(MOCK_FULL_BASE_URL + '/answer?token=blah&question=Is this API easy to use?&numberOfItems=2&offset=1')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 2
    response = session.get(MOCK_FULL_BASE_URL + '/answer?token=blah&question=Is this API easy to use?')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 1
    response = session.post(MOCK_FULL_BASE_URL + '/user/google-oauth2callback', {'successCallback': 'https://ui.thecape.ai',
                                                                                 'errorCallback': 'https://ui.thecape.ai/error'})
    assert response.status_code == 200
    response = session.post(MOCK_FULL_BASE_URL + '/user/facebook-oauth2callback', {'successCallback': 'https://ui.thecape.ai',
                                                                                   'errorCallback': 'https://ui.thecape.ai/error'})
    assert response.status_code == 200


def test_mock_unlucky():
    session = requests.Session()
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/login?login=bla&password=blu')
    assert response.status_code == 500
    assert response.json()['success'] == False and response.json()['result']['message'] ==INVALID_CREDENTIALS_TEXT

    # Perform a valid login against full API for authenticated requests
    response = session.get(MOCK_FULL_BASE_URL + '/user/login?login=bla&password=blu')
    assert response.status_code == 200
    assert response.json()['success'] == True and response.json()['result']['message'] == VALID_CREDENTIALS_TEXT

    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/get-user-token')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/get-profile')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/get-admin-token')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/get-default-threshold')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/set-default-threshold?threshold=medium')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/set-forward-email?email=test')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/user/verify-forward-email?verifiedEmailToken=as0da09w')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/inbox/get-inbox')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/inbox/mark-inbox-read?inboxId=123')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/inbox/archive-inbox?inboxId=223')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/get-saved-replies')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/add-saved-reply?question=Test&answer=Testing')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/add-paraphrase-question?replyId=14&question=Test2')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/edit-paraphrase-question?questionId=14&question=Test3')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/edit-canonical-question?replyId=14&question=Test4')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/delete-paraphrase-question?questionId=14')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/add-answer?replyId=14&answer=Testing2')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/edit-answer?answerId=14&answer=Testing3')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/delete-answer?answerId=14')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/saved-replies/delete-saved-reply?replyId=14')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/get-annotations')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/add-annotation?question=Test&answer=Testing'
                                                   '&documentId=test&startOffset=0&endOffset=12')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/add-paraphrase-question?annotationId=testid&question=Test2')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/edit-paraphrase-question?questionId=testid&question=Test3')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/edit-canonical-question?annotationId=testid&question=Test4')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/delete-paraphrase-question?questionId=testid')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/add-answer?annotationId=testid&answer=Testing2')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/edit-answer?answerId=testid&answer=Testing3')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/delete-answer?answerId=testid')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/annotations/delete-annotation?annotationId=testid')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/documents/get-documents')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/documents/add-document?title=Test&text=hello&origin=test.txt')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/documents/delete-document?documentId=custom_id_2')
    assert response.status_code == 500
    assert response.json()['success'] == False
    response = session.get(MOCK_UNLUCKY_BASE_URL + '/answer?token=blah&question=Is this API easy to use?')
    assert response.status_code == 200
    assert response.json()['success'] == True and len(response.json()['result']['items']) == 0
    

def test_mock_error():
    session = requests.Session()
    response = session.get(MOCK_ERROR_BASE_URL + '/logout')
    assert response.status_code == 500
    assert response.json()['success'] == False and  response.json()['result']['message'] ==ERROR_TEXT


def test_mock_timeout():
    session = requests.Session()
    with pytest.raises(requests.exceptions.Timeout):
        response = session.get(MOCK_TIMEOUT_BASE_URL + '/logout',timeout=0.5)

