<style scoped lang="scss">
  @import "../../scss/cape";

  @mixin contain() {
    width: 40rem;
    margin: 0 auto;
  }

  .cape-dashboard-terms-modal {
    @include layout-fit();

    // Cover

    .cover {
      @include layout-fit();
      z-index: 0;
      background: $black;
      opacity: 0.9;
    }

    // Body

    .body {
      @include layout-vertical();
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;

      // Header

      .header-wrapper {
        @include contain();
      }

      .header {
        @include layout-horizontal();
        @include layout-center();
        @include layout-justified();
        padding: 1rem 1.5rem;
        border-bottom: 1px solid $grey-800;


        // Typography

        h4 {
          @include typography-headline();
          color: $white;
        }

        // Close

        .cape-dashboard-icon-button {
          color: $grey-700;

          &:hover {
            color: $grey-500;
            background-color: $grey-900;
          }
        }
      }

      // Content

      .content-wrapper {
        @include layout-flex();
        @include layout-scroll-vertical();
      }

      .content {

        // Page

        .page-wrapper {
          @include contain();
        }

        .page {
          padding: 2rem 1.5rem 1rem 1.5rem;

          // Typography

          h6 {
            @include typography-body-2();
            margin: 0 0 1rem 0;
            color: $grey-400;
          }

          p {
            @include typography-body-1();
            margin: 0 0 1rem 0;
            color: $grey-400;
          }

        }

      }

      // Actions

      .actions-wrapper {
        @include contain();
      }

      .actions {
        @include layout-horizontal();
        @include layout-end-justified();
        border-top: 1px solid $grey-800;
        padding: 1.5rem;

        // Button

        .cape-dashboard-label-button {
          background-color: $blue-500;
          color: $white;

          &:hover {
            background-color: $blue-700;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="cape-dashboard-terms-modal">
    <div class="cover"></div>
    <div class="body">
      <div v-bind:style="scrollbarCompensateStyleObject">
        <div class="header-wrapper">
          <div class="header">
            <h4>Terms of Service</h4>
            <cape-dashboard-icon-button
              icon="fa-times"
              v-bind:iconSize="0.875"
              v-bind:size="2.5"
              v-on:click.native="_handleCloseClick"/>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="content">
          <div class="page-wrapper">
            <div class="page">
              <p>These Terms of Service set out the terms and conditions upon which you may use the Bloomsbury AI Service and any application or functionality Bloomsbury AI makes available through the Bloomsbury AI Service. Please read these Terms of Service carefully and make sure you understand and agree to them before using the Bloomsbury AI Service. By using the Bloomsbury AI Service, you agree to and accept these Terms of Service.</p>
              <h6>Interpretation</h6>
              <p>In these Terms of Service, save where the context requires otherwise, the following words and expressions have the following meaning: "Agreement" means the agreement between the User and Bloomsbury AI for the provision of the Service comprising these Terms of Service “Data” means all data, reports, information or other materials uploaded or created by the User on or through the Services “Service(s)” means the products and services used by the User made available by Bloomsbury AI "We," "Us," "Our" or “Bloomsbury AI” means Bloomsbury AI "You," "Your," or “User” means the company or other legal entity for which you are accepting this Agreement, and Affiliates of that company or entity.</p>
              <h6>Access</h6>
              <p>Bloomsbury AI grants the User a non-exclusive, non-transferable, personal and non sub-licensable licence to use the Bloomsbury AI Service. Access is permitted on a temporary basis, and Bloomsbury AI reserve the right to withdraw or amend the Service provided without notice.</p>
              <h6>Intellectual Property Rights</h6>
              <p>Bloomsbury AI is the owner or the licensee of all intellectual property rights in the Bloomsbury AI website and Service, and in the material published on it. Bloomsbury grants the User permission to access our site for personal use only. Any other use of the site content or the Service is prohibited. This prohibition includes, but is not limited to: making commercial use of our site's content; reproduction of the Bloomsbury AI name, logo, or any other content available on our site; and downloading or copying any of our site content for yourself or for a third-party.</p>
              <p>The User will not, when using the Bloomsbury AI Service, except as may be allowed by any applicable law which is incapable of exclusion by Bloomsbury AI attempt to copy, modify, duplicate, create derivative works from, frame, mirror, republish, download, display, transmit, or distribute all or any portion of the Bloomsbury AI Service in any form or media or by any means or access all or any part of the Bloomsbury AI Service in order to build a product or service which competes with the Bloomsbury AI Service or use or attempt to use the Bloomsbury AI Service to directly compete with Bloomsbury AI.</p>
              <h6>Data</h6>
              <p>By accessing Bloomsbury AI’s Services, the User represents to have all necessary authority, permissions, and approvals to grant access to the websites, documents and text that are connected with the Services, and to use the Services, including without limitation, providing and enabling Bloomsbury AI to collect all the information submitted or made available in connection with the Services.</p>
              <p>Bloomsbury AI does not claim ownership in the User Data. The User grants Bloomsbury AI a licence to access, download and use the User Data for the purpose of analysing the Data in accordance with the Bloomsbury AI Service functionality, displaying the results of such analysis, developing, testing, improving and altering the functionality of the Bloomsbury AI Service and producing anonymised statistical reports and research.</p>
              <p>The User hereby grants to Bloomsbury AI and its successors and assigns a worldwide, nonexclusive, royalty free, fully paid, transferable, sublicensable, perpetual, irrevocable licence to copy, use, reproduce, access, modify, compile, analyse, and create derivative works of the Data in connection with operating the Services, both for the User and Bloomsbury AI's other Users, developing, enhancing and supporting the Services, and using the Data to train machine learning models. Bloomsbury AI confirm that no other user will have access to the User’s Data, subject to the confidentiality provisions of these Terms.</p>
              <p>The User represents and warrants that it has all rights, power and authority necessary to grant the rights granted herein to any such User Data. The User shall maintain a backup of User Data and Bloomsbury AI shall not be responsible or liable for the deletion, correction, alteration, destruction, damage, loss, disclosure or failure to store any User Data.</p>
              <h6>Publicity</h6>
              <p>Bloomsbury AI may use the User's name, logo and related trademarks in any of Bloomsbury AI's publicity or marketing materials (whether in printed or electronic form) for the purpose of promoting the Service. The User grants Bloomsbury AI such rights as are necessary to use its name, logo, related trademarks and testimonials for the purpose of this clause.</p>
              <h6>Confidential Information.</h6>
              <p>Each party may be given access to Confidential Information from the other party in order to perform its obligations under these Terms of Service. A party's Confidential Information shall not be deemed to include information that is or becomes publicly known other than through any act or omission of the receiving party; was in the other party's lawful possession before the disclosure; is lawfully disclosed to the receiving party by a third party without restriction on disclosure; is independently developed by the receiving party, which independent development can be shown by written evidence; or is required to be disclosed by law, by any court of competent jurisdiction or by any regulatory or administrative body.</p>
              <p>Each party shall hold the other's Confidential Information in confidence and, unless required by law, not make the other's Confidential Information available for use for any purpose other than as needed to perform the terms of the Agreement.</p>
              <p>Each party shall take all reasonable steps to ensure that the other's Confidential Information to which it has access is not disclosed or distributed by it or its employees or agents in violation of the terms of the Agreement.</p>
              <p>Each party shall take a back-up of its own Confidential Information and shall not be responsible to the other for any loss, destruction, alteration or disclosure of Confidential Information.</p>
              <h6>Termination</h6>
              <p>If the User violates these Terms, permission to use the Services will automatically terminate. The User also agrees that Bloomsbury AI may at any time, and without notice, terminate the User’s right to access and use all or any part of the Services. Bloomsbury AI will have no liability whatsoever for and may at any time change, modify, update, remove, or add features to the Services or suspend or revoke access to or use of all or part of the Services. The User may terminate use of the Service and these Terms at any time by contacting Bloomsbury AI. On termination of the Agreement for any reason all licences granted under the Agreement shall immediately terminate and the User's right to access and use the Bloomsbury AI Service will end.</p>
              <h6>Warranty</h6>
              <p>Bloomsbury AI Service is provided on an “as is" basis and Bloomsbury AI gives no representations, warranties, conditions or other terms of any kind in respect of the Bloomsbury AI Service, whether express or implied, including, but not limited to, warranties of satisfactory quality, merchantability fitness for a particular purpose or non-infringement.</p>
              <p>All representations, warranties, conditions and all other terms of any kind whatsoever implied by statute or common law are, to the fullest extent permitted by law, excluded from the Agreement. Bloomsbury AI will not be responsible for any interruptions, delays, failures or non-availability affecting the Bloomsbury AI Service or the performance of the Bloomsbury AI Service which are caused by third party services or errors or bugs in software, hardware or the internet on which Bloomsbury AI relies to provide the Service.</p>
              <p>No party shall be liable to the other for any delay or non-performance of its obligations under the Agreement arising from any cause beyond its control including, without limitation, any of the following: telecommunications failure, internet failure, act of God, governmental act, war, fire, flood, explosion or civil commotion.</p>
              <h6>Liability</h6>
              <p>Subject to this clause, Bloomsbury AI will not be liable for losses that result from Bloomsbury AI's failure to comply with the Agreement, in tort (including negligence) or otherwise in conditions that fall into the following categories: loss of income or revenue; loss of business; loss of profits; loss of anticipated savings; loss of data; waste of management or office time; or any indirect, consequential or special damages, costs or expenses. Nothing in these Terms shall limit or exclude a party’s liability for death or personal injury caused by its negligence or for fraud or fraudulent misrepresentation or for any other act, omission or liability that may not be limited or excluded by law.</p>
              <h6>Indemnity</h6>
              <p>The User will defend and indemnify and hold harmless Bloomsbury AI, its affiliates and licensors, and each of their respective employees, officers, directors, consultants, affiliates, subsidiaries, agents and contractors (collectively, the "Bloomsbury AI Entities") from and against any and all damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from any actual or threatened claim, demand, proceeding, audit, inquiry, or investigation by any person or entity (including without limitation any UK governmental body or agency) related to actual or alleged access to or use of the Services, breach or noncompliance with these Terms, applicable law, and your obligations to any third parties or violation, misappropriation, or infringement of any third party right, including without limitation, any intellectual property, moral, publicity, confidentiality, property, or privacy right.</p>
              <p>The User will not settle any indemnified matter that requires any admission of wrongdoing or any obligation, other than the payment of money that is the User’s obligation to pay, without Bloomsbury AI’s prior written consent. Bloomsbury AI reserves the right to assume the exclusive defence and control of any matter otherwise subject to indemnification, and in such case, the User agrees to cooperate with Bloomsbury AI’s defence of such claim.</p>
              <h6>Right to Vary the Terms of Service</h6>
              <p>Bloomsbury AI has the right to revise and amend these Terms of Service. The User will be subject to the Terms of Service in force at the time that it makes use of the Bloomsbury AI Service, or if Bloomsbury AI notifies the User of changes to these Terms of Service and the User continues to use the Bloomsbury AI Service the User will be subject to those changes.</p>
              <p>Bloomsbury AI will use reasonable endeavours to notify the User of any material changes to these Terms of Service by email or by the placement of a notice on the Bloomsbury AI website.</p>
              <h6>Transfer of Rights and Obligations</h6>
              <p>The User may not transfer, assign, charge or otherwise deal in the Agreement, or any of the User's rights or obligations arising under the Agreement, without Bloomsbury AI's prior written consent.</p>
              <p>A person who is not party to the Agreement shall not have any rights under or in connection with them under the Contracts (Rights of Third Parties) Act 1999.</p>
              <h6>Waiver and Severability</h6>
              <p>No forbearance or delay by either party in enforcing its rights shall prejudice or restrict the rights of that party, and no waiver of any such rights or of any breach of any contractual terms shall be deemed to be a waiver of any other right or of any later breach. If any provision of the Agreement is judged to be illegal or unenforceable, the continuation in full force and effect of the remainder of the provisions shall not be prejudiced.</p>
              <h6>Law and Jurisdiction</h6>
              <p>The Agreement shall be governed by and construed in accordance with English law and each party hereby submits to the exclusive jurisdiction of the English courts. The parties both agree to the exclusive jurisdiction of the courts of England and Wales to settle any claim, dispute or issue (including non-contractual claims) which may arise out of or in connection with these Terms, except that no party shall seek to litigate any dispute through the courts without first having attempted a mediation.</p>
            </div>
          </div>
        </div>
      </div>
      <div v-bind:style="scrollbarCompensateStyleObject">
        <div class="actions-wrapper">
          <div class="actions">
            <cape-dashboard-label-button
              label="Agree"
              v-on:click.native="_handleAgreeClick"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import client from '@/client'
import IconButton from '@/components/button/Icon'
import LabelButton from '@/components/button/Label'

export default {

  data () {
    return {
      scrollbarWidth: 0
    }
  },

  components: {
    'cape-dashboard-icon-button': IconButton,
    'cape-dashboard-label-button': LabelButton
  },

  computed: {
    scrollbarCompensateStyleObject () {
      return {
        'margin-right': this.scrollbarWidth + 'px'
      }
    }
  },

  methods: {
    // _handleCloseClick is an event handler
    // triggered when a user clicks the close
    // button
    _handleCloseClick () {
      this.$emit('close')
    },

    // _handleAgreeClick is an event handler
    // triggered when a user click the agree
    // button
    _handleAgreeClick () {
      client.user.terms.agree()
      this.$emit('agree')
    },

    // _compensateContentScrollbar
    _compensateContentScrollbar () {
      const $contentWrapper = $('.content-wrapper', this.$el)
      const $content = $('.content', this.$el)
      this.scrollbarWidth = $contentWrapper.innerWidth() - $content.innerWidth()
    }
  },

  mounted () {
    this._compensateContentScrollbar()
  }

}
</script>
