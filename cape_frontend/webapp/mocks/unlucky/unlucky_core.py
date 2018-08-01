from sanic import Blueprint, response
from cape_frontend.webapp.mocks.unlucky.unlucky_settings import URL_BASE
from cape_frontend.webapp.mocks.mocks_core import respond_with_json, delete_current_session, requires_auth
from cape_api_helpers.output import list_response
from cape_api_helpers.input import required_parameter, optional_parameter
from cape_api_helpers.exceptions import UserException
from cape_api_helpers.text_responses import *
import hashlib

mock_unlucky_endpoints = Blueprint('mock_unlucky_endpoints')

endpoint_route = lambda x: mock_unlucky_endpoints.route(URL_BASE + x, methods=['GET', 'POST'])


@endpoint_route('/user/login')
@respond_with_json
def _login(request):
    user, password = request['args']['login'], request['args']['password']
    delete_current_session(request)
    raise UserException(INVALID_CREDENTIALS_TEXT)


@endpoint_route('/user/google-oauth2callback')
@endpoint_route('/user/facebook-oauth2callback')
def _oauth2callback(request):
    success_cb = required_parameter(request, 'successCallback')
    error_cb = required_parameter(request, 'errorCallback')
    return response.redirect("%s?error=%s" % (error_cb, INVALID_CREDENTIALS_TEXT))


@endpoint_route('/user/get-user-token')
@endpoint_route('/user/get-admin-token')
@endpoint_route('/user/get-profile')
@endpoint_route('/user/logout')
@endpoint_route('/user/get-default-threshold')
@respond_with_json
@requires_auth
def _auth_failure(request):
    raise UserException(INVALID_CREDENTIALS_TEXT)


@endpoint_route('/inbox/get-inbox')
@endpoint_route('/saved-replies/get-saved-replies')
@endpoint_route('/documents/get-documents')
@endpoint_route('/annotations/get-annotations')
@respond_with_json
@requires_auth
@list_response
def _empty_list_reply(request, number_of_items=30, offset=0):
    return {'totalItems': 0, 'items': []}


@endpoint_route('/inbox/mark-inbox-read')
@respond_with_json
@requires_auth
def _mark_inbox_read(request):
    inbox_id = required_parameter(request, 'inboxId')
    raise UserException(ERROR_INBOX_DOES_NOT_EXIST % inbox_id)


@endpoint_route('/inbox/archive-inbox')
@respond_with_json
@requires_auth
def _archive_inbox(request):
    inbox_id = required_parameter(request, 'inboxId')
    raise UserException(ERROR_INBOX_DOES_NOT_EXIST % inbox_id)


@endpoint_route('/saved-replies/add-saved-reply')
@respond_with_json
@requires_auth
def _create_saved_reply(request):
    question = required_parameter(request, 'question')
    answer = required_parameter(request, 'answer')
    raise UserException(ERROR_REPLY_ALREADY_EXISTS % question)


@endpoint_route('/saved-replies/delete-saved-reply')
@respond_with_json
@requires_auth
def _delete_saved_reply(request):
    reply_id = required_parameter(request, 'replyId')
    raise UserException(ERROR_REPLY_DOES_NOT_EXIST % reply_id)


@endpoint_route('/saved-replies/add-paraphrase-question')
@respond_with_json
@requires_auth
def _add_paraphrase_question(request):
    reply_id = required_parameter(request, 'replyId')
    question = required_parameter(request, 'question')
    raise UserException(ERROR_REPLY_ALREADY_EXISTS % question)


@endpoint_route('/annotations/edit-paraphrase-question')
@endpoint_route('/saved-replies/edit-paraphrase-question')
@respond_with_json
@requires_auth
def _edit_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    question = required_parameter(request, 'question')
    raise UserException(ERROR_QUESTION_DOES_NOT_EXIST % question_id)


@endpoint_route('/saved-replies/edit-canonical-question')
@respond_with_json
@requires_auth
def _edit_canonical_question(request):
    reply_id = required_parameter(request, 'replyId')
    question = required_parameter(request, 'question')
    raise UserException(ERROR_REPLY_DOES_NOT_EXIST % reply_id)


@endpoint_route('/annotations/delete-paraphrase-question')
@endpoint_route('/saved-replies/delete-paraphrase-question')
@respond_with_json
@requires_auth
def _delete_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    raise UserException(ERROR_QUESTION_DOES_NOT_EXIST % question_id)


@endpoint_route('/saved-replies/add-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    reply_id = required_parameter(request, 'replyId')
    answer = required_parameter(request, 'answer')
    raise UserException(ERROR_REPLY_DOES_NOT_EXIST % reply_id)


@endpoint_route('/annotations/edit-answer')
@endpoint_route('/saved-replies/edit-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    answer_id = required_parameter(request, 'answerId')
    answer = required_parameter(request, 'answer')
    raise UserException(ERROR_ANSWER_DOES_NOT_EXIST % answer_id)


@endpoint_route('/annotations/delete-answer')
@endpoint_route('/saved-replies/delete-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    answer_id = required_parameter(request, 'answerId')
    raise UserException(ERROR_ANSWER_DOES_NOT_EXIST % answer_id)


@endpoint_route('/documents/add-document')
@respond_with_json
@requires_auth
def _upload_document(request):
    title = required_parameter(request, 'title')
    if 'text' in request['args']:
        document_content = request['args']['text']
    elif 'file' in request.files:
        document_file = request.files.get('file')
        document_content = document_file.body.decode()
    else:
        raise UserException(ERROR_NUMERIC_REQUIRED % "text' or 'file")

    if 'documentid' in request['args']:
        document_id = request['args']['documentid']
    else:
        document_id = hashlib.sha256(document_content.encode('utf-8')).hexdigest()

    if 'replace' not in request['args']:
        raise UserException(ERROR_DOCUMENT_ALREADY_EXISTS % document_id)
    raise UserException(ERROR_UPLOAD_FAILED)


@endpoint_route('/documents/delete-document')
@respond_with_json
@requires_auth
def _delete_document(request):
    document_id = required_parameter(request, 'documentId')
    raise UserException(ERROR_DOCUMENT_DOES_NOT_EXIST % document_id)


@endpoint_route('/answer')
@respond_with_json
@list_response
def _answer(request, number_of_items=1, offset=0):
    token = optional_parameter(request, 'token', None)
    if token is None and 'session' not in request and 'admintoken' not in request['args']:
        raise UserException(ERROR_REQUIRED_PARAMETER % 'userToken')
    question = required_parameter(request, 'question')
    return {"items": []}


@endpoint_route('/user/set-default-threshold')
@respond_with_json
@requires_auth
def _set_default_threshold(request):
    threshold = required_parameter(request, 'threshold').lower()
    raise UserException(ERROR_INVALID_THRESHOLD)


@endpoint_route('/user/set-forward-email')
@respond_with_json
@requires_auth
def _set_forward_Email(request):
    email = required_parameter(request, 'email')
    raise UserException(ERROR_INVALID_EMAIL)

@endpoint_route('/user/verify-forward-email')
@respond_with_json
@requires_auth
def _set_forward_Email(request):
    email_token = required_parameter(request, 'verifiedEmailToken')
    raise UserException(ERROR_INVALID_EMAIL_TOKEN % email_token)

@endpoint_route('/annotations/add-annotation')
@respond_with_json
@requires_auth
def _add_annotation(request):
    question = required_parameter(request, 'question')
    answer = required_parameter(request, 'answer')
    document = required_parameter(request, 'documentId')
    raise UserException(ERROR_ANNOTATION_ALREADY_EXISTS % question)


@endpoint_route('/annotations/delete-annotation')
@respond_with_json
@requires_auth
def _delete_annotation(request):
    annotation_id = required_parameter(request, 'annotationId')
    raise UserException(ERROR_ANNOTATION_DOES_NOT_EXIST % annotation_id)


@endpoint_route('/annotations/add-paraphrase-question')
@respond_with_json
@requires_auth
def _add_annotation_paraphrase_question(request):
    annotation_id = required_parameter(request, 'annotationId')
    question = required_parameter(request, 'question')
    raise UserException(ERROR_ANNOTATION_ALREADY_EXISTS % question)


@endpoint_route('/annotations/edit-canonical-question')
@respond_with_json
@requires_auth
def _edit_annotation_canonical_question(request):
    annotation_id = required_parameter(request, 'annotationId')
    question = required_parameter(request, 'question')
    raise UserException(ERROR_ANNOTATION_DOES_NOT_EXIST % annotation_id)


@endpoint_route('/annotations/add-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    annotation_id = required_parameter(request, 'annotationId')
    answer = required_parameter(request, 'answer')
    raise UserException(ERROR_ANNOTATION_DOES_NOT_EXIST % annotation_id)
