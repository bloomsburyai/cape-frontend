import Vue from 'vue'
import Router from 'vue-router'

import StatisticsLayout from '@/components/statistics/Layout'
import AssistantLayout from '@/components/assistant/Layout'
import InboxLayout from '@/components/inbox/Layout'
import SavedRepliesLayout from '@/components/savedReplies/Layout'
import DocumentsLayout from '@/components/documents/Layout'
import IntegrationsLayout from '@/components/integrations/Layout'

import InspectorComponentsAlert from '@/components/inspector/components/Alert'
import InspectorComponentsDropdownTrigger from '@/components/inspector/components/dropdown/Trigger'
import InspectorComponentAutogrowTextarea from '@/components/inspector/components/AutogrowTextarea'
import InspectorComponentsBubble from '@/components/inspector/components/Bubble'
import InspectorComponentsMessage from '@/components/inspector/components/Message'
import InspectorComponentsButton from '@/components/inspector/components/Button'
import InspectorComponentsProgress from '@/components/inspector/components/Progress'
import InspectorTypographySize from '@/components/inspector/typography/Size'
import InspectorTypographyLeading from '@/components/inspector/typography/Leading'
import InspectorTypographyTracking from '@/components/inspector/typography/Tracking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsLayout
    },
    {
      alias: '/',
      path: '/assistant',
      name: 'assistant',
      component: AssistantLayout
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: InboxLayout
    },
    {
      path: '/saved-replies/:id?',
      name: 'savedReplies',
      component: SavedRepliesLayout
    },
    {
      path: '/documents/:id?',
      name: 'documents',
      component: DocumentsLayout
    },
    {
      path: '/integrations/:platform',
      name: 'integrations',
      component: IntegrationsLayout
    },
    {
      path: '/inspector/components/alert',
      component: InspectorComponentsAlert
    },
    {
      path: '/inspector/components/dropdown/trigger',
      component: InspectorComponentsDropdownTrigger
    },
    {
      path: '/inspector/components/autogrow-textarea',
      component: InspectorComponentAutogrowTextarea
    },
    {
      path: '/inspector/components/bubble',
      component: InspectorComponentsBubble
    },
    {
      path: '/inspector/components/message',
      component: InspectorComponentsMessage
    },
    {
      path: '/inspector/components/button',
      component: InspectorComponentsButton
    },
    {
      path: '/inspector/components/progress',
      component: InspectorComponentsProgress
    },
    {
      path: '/inspector/typography/size',
      component: InspectorTypographySize

    },
    {
      path: '/inspector/typography/leading',
      component: InspectorTypographyLeading
    },
    {
      path: '/inspector/typography/tracking',
      component: InspectorTypographyTracking
    }
  ]
})
