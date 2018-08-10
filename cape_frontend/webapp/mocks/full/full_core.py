# Copyright 2018 BLEMUNDSBURY AI LIMITED
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json

from sanic import Blueprint, response
from cape_frontend.webapp.mocks.full.full_settings import URL_BASE
from cape_frontend.webapp.mocks.mocks_core import respond_with_json, insert_new_session, delete_current_session, \
    requires_auth
from cape_api_helpers.output import list_response, true_false_both_filter
from cape_api_helpers.input import required_parameter, optional_parameter, list_document_ids, list_saved_reply_ids, \
    list_annotation_ids, list_bounding_boxes, list_pages, dict_metadata
from cape_api_helpers.text_responses import *
from cape_api_helpers.exceptions import UserException
from cape_frontend.webapp.mocks import mock_data

import hashlib

mock_full_endpoints = Blueprint('mock_full_endpoints')

_endpoint_route = lambda x: mock_full_endpoints.route(URL_BASE + x, methods=['GET', 'POST'])

AVAILABLE_PLANS = {'free', 'basic', 'pro'}
MAX_SIZE_INLINE_TEXT = 6789


@_endpoint_route('/user/login')
@respond_with_json
def _login(request):
    print(request.raw_args)
    user, password = request['args']['login'], request['args']['password']
    insert_new_session(request)
    return {'message': VALID_CREDENTIALS_TEXT, 'sessionId': request['session'], 'adminToken': mock_data.admin_token}


@_endpoint_route('/user/google-oauth2callback')
@_endpoint_route('/user/facebook-oauth2callback')
def _oauth2callback(request):
    success_cb = required_parameter(request, 'successCallback')
    error_cb = required_parameter(request, 'errorCallback')
    insert_new_session(request)
    return response.redirect(success_cb)


@_endpoint_route('/user/get-user-token')
@respond_with_json
@requires_auth
def _get_token(request):
    return {'userToken': mock_data.user_token}


@_endpoint_route('/user/get-admin-token')
@respond_with_json
@requires_auth
def _get_admin_token(request):
    return {'adminToken': mock_data.admin_token}


@_endpoint_route('/user/get-profile')
@respond_with_json
@requires_auth
def _get_profile(request):
    return {'username': mock_data.username, 'plan': 'free', 'termsAgreed': False, 'onboardingCompleted': False,
            'forwardEmail': 'test@bloomsbury.ai', 'forwardEmailVerified': False}


@_endpoint_route('/user/set-plan')
@respond_with_json
@requires_auth
def _set_plan(request):
    plan = required_parameter(request, 'plan').lower()
    if plan not in AVAILABLE_PLANS:
        raise UserException(ERROR_INVALID_PLAN % (plan, str(AVAILABLE_PLANS)))
    return {'plan': plan}


@_endpoint_route('/user/set-terms-agreed')
@respond_with_json
@requires_auth
def _set_agreed_terms(request):
    return {'termsAgreed': True}


@_endpoint_route('/user/set-onboarding-completed')
@respond_with_json
@requires_auth
def _set_agreed_terms(request):
    return {'onboardingCompleted': True}


@_endpoint_route('/user/set-forward-email')
@respond_with_json
@requires_auth
def _set_forward_email(request):
    email = required_parameter(request, 'email')
    return {'forwardEmail': email}


@_endpoint_route('/user/verify-forward-email')
@respond_with_json
@requires_auth
def _verify_forward_email(request):
    required_parameter(request, 'verifiedEmailToken')
    return {'forwardEmail': 'sample@mail.com', 'forwardEmailVerified': True}


@_endpoint_route('/user/get-default-threshold')
@respond_with_json
@requires_auth
def _get_default_threshold(request):
    return {'threshold': 'medium'}


@_endpoint_route('/user/set-default-threshold')
@respond_with_json
@requires_auth
def _set_default_threshold(request):
    threshold = required_parameter(request, 'threshold').lower()
    if threshold not in ['verylow', 'low', 'medium', 'high', 'veryhigh']:
        raise UserException(ERROR_INVALID_THRESHOLD)
    return {'threshold': threshold}


@_endpoint_route('/user/logout')
@respond_with_json
def _logout(request):
    delete_current_session(request)
    return {'message': LOGGED_OUT_TEXT}


@_endpoint_route('/inbox/get-inbox')
@respond_with_json
@requires_auth
@list_response
def _get_inbox(request, number_of_items=30, offset=0):
    search_term = optional_parameter(request, 'searchTerm', None)
    if search_term is not None:
        search_term = search_term.lower()
        items = [item for item in mock_data.inbox if search_term in item['question'].lower()]
    else:
        items = mock_data.inbox
    items = true_false_both_filter(request, items, 'read')
    items = true_false_both_filter(request, items, 'answered')
    total_items = len(items)
    items = items[offset:offset + number_of_items]
    return {'totalItems': total_items, 'items': items}


@_endpoint_route('/inbox/mark-inbox-read')
@respond_with_json
@requires_auth
def _mark_inbox_read(request):
    inbox_id = required_parameter(request, 'inboxId')
    return {'inboxId': request['args']['inboxid']}


@_endpoint_route('/inbox/archive-inbox')
@respond_with_json
@requires_auth
def _archive_inbox(request):
    inbox_id = required_parameter(request, 'inboxId')
    return {'inboxId': inbox_id}


@_endpoint_route('/saved-replies/get-saved-replies')
@respond_with_json
@requires_auth
@list_response
@list_saved_reply_ids
def _get_saved_replies(request, number_of_items=30, offset=0, saved_reply_ids=None):
    search_term = optional_parameter(request, 'searchTerm', None)
    if search_term is not None:
        items = []
        search_term = search_term.lower()
        for item in mock_data.saved_replies:
            if search_term in item['canonicalQuestion'].lower():
                items.append(item)
                continue
            for answer in item['answers']:
                if search_term in answer['answer'].lower():
                    items.append(item)
                    continue
            for question in item['paraphraseQuestions']:
                if search_term in question['question'].lower():
                    items.append(item)
                    continue
    else:
        items = mock_data.saved_replies
    if saved_reply_ids is not None:
        items = [reply for reply in items if reply['id'] in saved_reply_ids]
    total_items = len(items)
    items = items[offset:offset + number_of_items]
    return {'totalItems': total_items, 'items': items}


@_endpoint_route('/saved-replies/add-saved-reply')
@respond_with_json
@requires_auth
def _create_saved_reply(request):
    question = required_parameter(request, 'question')
    answer = required_parameter(request, 'answer')
    return {'replyId': 'f9f1cf90-c3b1-11e7-91a1-9801a7ae6c69', 'answerId': 'a67678b6-c3b1-11e7-abaa-9801a7ae6c69'}


@_endpoint_route('/saved-replies/delete-saved-reply')
@respond_with_json
@requires_auth
def _delete_saved_reply(request):
    reply_id = required_parameter(request, 'replyId')
    return {'replyId': reply_id}


@_endpoint_route('/saved-replies/add-paraphrase-question')
@respond_with_json
@requires_auth
def _add_paraphrase_question(request):
    reply_id = required_parameter(request, 'replyId')
    question = required_parameter(request, 'question')
    return {'questionId': '21e9689e-c3b2-11e7-8a22-9801a7ae6c69'}


@_endpoint_route('/saved-replies/edit-paraphrase-question')
@respond_with_json
@requires_auth
def _edit_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    question = required_parameter(request, 'question')
    return {'questionId': question_id}


@_endpoint_route('/saved-replies/edit-canonical-question')
@respond_with_json
@requires_auth
def _edit_canonical_question(request):
    reply_id = required_parameter(request, 'replyId')
    question = required_parameter(request, 'question')
    return {'replyId': reply_id}


@_endpoint_route('/saved-replies/delete-paraphrase-question')
@respond_with_json
@requires_auth
def _delete_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    return {'questionId': question_id}


@_endpoint_route('/saved-replies/add-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    reply_id = required_parameter(request, 'replyId')
    answer = required_parameter(request, 'answer')
    return {'answerId': 'a67678b6-c3b1-11e7-abaa-9801a7ae6c69'}


@_endpoint_route('/saved-replies/edit-answer')
@respond_with_json
@requires_auth
def _edit_answer(request):
    answer_id = required_parameter(request, 'answerId')
    return {'answerId': answer_id}


@_endpoint_route('/saved-replies/delete-answer')
@respond_with_json
@requires_auth
def _delete_answer(request):
    answer_id = required_parameter(request, 'answerId')
    return {'answerId': answer_id}


@_endpoint_route('/documents/get-documents')
@respond_with_json
@requires_auth
@list_response
@list_document_ids
def _get_documents(request, number_of_items=30, offset=0, document_ids=None):
    if document_ids:
        items = [item for item in mock_data.documents if item['id'] in document_ids]
    else:
        items = mock_data.documents

    search_term = optional_parameter(request, 'searchTerm', None)
    if search_term is not None:
        search_term = search_term.lower()
        items = [item for item in items if (search_term in item['title'].lower()
                                            or search_term in item['text'].lower())]

    total_items = len(items)
    items = items[offset:offset + number_of_items]
    return {'totalItems': total_items, 'items': items}


@_endpoint_route('/documents/add-document')
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
        raise UserException(ERROR_REQUIRED_PARAMETER % "text' or 'file")

    if 'documentid' in request['args'] and request['args']['documentid'] != '':
        document_id = request['args']['documentid']
    else:
        document_id = hashlib.sha256(document_content.encode('utf-8')).hexdigest()
    return {'documentId': document_id}


@_endpoint_route('/documents/delete-document')
@respond_with_json
@requires_auth
def _delete_document(request):
    document_id = required_parameter(request, 'documentId')
    return {'documentId': document_id}


@_endpoint_route('/answer')
@respond_with_json
@list_response
@list_document_ids
def _answer(request, number_of_items=1, offset=0, document_ids=None):
    token = optional_parameter(request, 'token', None)
    text = optional_parameter(request, 'text', None)
    if token is None and 'session' not in request and 'admintoken' not in request['args']:
        raise UserException(ERROR_REQUIRED_PARAMETER % 'userToken')
    question = required_parameter(request, 'question')
    if text is not None and len(text) > MAX_SIZE_INLINE_TEXT:
        raise UserException(ERROR_MAX_SIZE_INLINE_TEXT % (MAX_SIZE_INLINE_TEXT, len(text)))
    if document_ids:
        items = [item for item in mock_data.answers if item['sourceId'] in document_ids]
    else:
        items = mock_data.answers

    source_type = optional_parameter(request, 'sourceType', 'all').lower()
    if source_type == 'document' or source_type == 'saved_reply':
        items = [item for item in items if item['sourceType'] == source_type]
    elif source_type != 'all':
        raise UserException(ERROR_INVALID_SOURCE_TYPE)

    items = items[offset:offset + number_of_items]
    return {'items': items}


@_endpoint_route('/annotations/get-annotations')
@respond_with_json
@list_response
@list_annotation_ids
@list_document_ids
@list_pages
def _get_annotations(request, number_of_items=30, offset=0, annotation_ids=None, document_ids=None, pages=None):
    if annotation_ids:
        items = [item for item in mock_data.annotations if item['id'] in annotation_ids]
    else:
        items = mock_data.annotations

    if document_ids:
        items = [item for item in items if item['documentId'] in document_ids]

    if pages:
        items = [item for item in items if 'page' in item and item['page'] in pages]

    search_term = optional_parameter(request, 'searchTerm', None)
    if search_term is not None:
        search_term = search_term.lower()
        items = [item for item in items if search_term in item['canonicalQuestion'].lower()]

    total_items = len(items)
    items = items[offset:offset + number_of_items]
    return {'totalItems': total_items, 'items': items}


@_endpoint_route('/annotations/add-annotation')
@respond_with_json
@list_bounding_boxes
@dict_metadata
@requires_auth
def _add_annotation(request, bounding_boxes=None, metadata=None):
    question = required_parameter(request, 'question')
    answer = required_parameter(request, 'answer')
    document_id = required_parameter(request, 'documentId')
    start_offset = optional_parameter(request, 'startOffset', None)
    end_offset = optional_parameter(request, 'endOffset', None)
    page = optional_parameter(request, 'page', None)
    if start_offset is not None:
        start_offset = int(start_offset)
    if end_offset is not None:
        end_offset = int(end_offset)
    if (bounding_boxes is None or page is None) and (start_offset is None or end_offset is None):
        raise UserException(ERROR_ANNOTATION_MISSING_PARAMS)

    return {'annotationId': 'f32258e5-f6e2-12d1-feed-4823e4bf6b52', 'answerId': 'e42358e5-b6f2-13e2-feeb-5843eebf6d41'}


@_endpoint_route('/annotations/delete-annotation')
@respond_with_json
@requires_auth
def _delete_annotation(request):
    annotation_id = required_parameter(request, 'annotationId')
    return {'annotationId': annotation_id}


@_endpoint_route('/annotations/edit-canonical-question')
@respond_with_json
@requires_auth
def _edit_canonical_question(request):
    annotation_id = required_parameter(request, 'annotationId')
    question = required_parameter(request, 'question')
    return {'annotationId': annotation_id}


@_endpoint_route('/annotations/add-paraphrase-question')
@respond_with_json
@requires_auth
def _add_paraphrase_question(request):
    annotation_id = required_parameter(request, 'annotationId')
    question = required_parameter(request, 'question')
    return {'questionId': 'e32123b3-e4f2-13e1-ebad-2321d4be6d49'}


@_endpoint_route('/annotations/edit-paraphrase-question')
@respond_with_json
@requires_auth
def _edit_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    return {'questionId': question_id}


@_endpoint_route('/annotations/delete-paraphrase-question')
@respond_with_json
@requires_auth
def _delete_paraphrase_question(request):
    question_id = required_parameter(request, 'questionId')
    return {'questionId': question_id}


@_endpoint_route('/annotations/add-answer')
@respond_with_json
@requires_auth
def _add_answer(request):
    annotation_id = required_parameter(request, 'annotationId')
    answer = required_parameter(request, 'answer')
    return {'answerId': 'b37218c6-d4e1-12f1-fcae-1201a7ae6d38'}


@_endpoint_route('/annotations/edit-answer')
@respond_with_json
@requires_auth
def _edit_answer(request):
    answer_id = required_parameter(request, 'answerId')
    return {'answerId': answer_id}


@_endpoint_route('/annotations/delete-answer')
@respond_with_json
@requires_auth
def _delete_answer(request):
    answer_id = required_parameter(request, 'answerId')
    return {'answerId': answer_id}
