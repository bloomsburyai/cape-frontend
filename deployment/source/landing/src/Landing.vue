<style lang="scss">
  @import "./scss/landing"
</style>

<style scoped lang="scss">

</style>

<template>
  <div class="cape-landing">
    <div class="guide">
      <div class="image"></div>
    </div>

    <!-- Navigation -->

    <div class="navigation">
      <div class="container">
        <div class="row">

          <!-- Logo -->

          <div class="col-2">
            <div class="logo">
              <a href="#">
                <span class="symbol"></span>
                <span class="type">Cape</span>
              </a>
            </div>
          </div>

          <!-- End logo -->

          <!-- Menu -->

          <div class="col-10 ml-auto">
            <div class="menu">
              <a href="#">
                Home
              </a>
              <a href="#features">
                Features
              </a>
              <a
                v-bind:href="links.documentationURL"
                target="_blank">
                Documentation
              </a>
              <a
                v-bind:href="links.licensingURL">
                Licensing
              </a>
              <template v-if="userIsLogged">
                <a
                  v-bind:href="links.dashboardURL"
                  class="btn">
                  Dashboard
                </a>
              </template>
              <template v-else>
                <a
                  v-bind:href="links.authenticationURL"
                  class="btn">
                  Log in</a>
              </template>
            </div>
          </div>

          <!-- End menu -->

        </div>
      </div>
    </div>

    <!-- End navigation -->

    <!-- Header -->

    <div class="header">
      <div class="background"></div>
      <div class="container">
        <div class="row">

          <!-- Content -->

          <div class="col-lg-5 col-md-6 col-sm-12">
            <div class="content">
              <h1>Questions meet answers</h1>
              <h6>Cape is an <strong>open source question answering system</strong> that answers questions by learning from you and your docs.</h6>
              <div class="actions">
                <a
                  class="btn btn-login"
                  v-bind:href="links.getstartedURL"
                  target="_blank">
                  Get Started
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.dockerhubURL"
                  target="_blank">
                  <img class="btn-icon" alt="DockerHub" height="16" src="https://hub.docker.com/public/images/logos/mini-logo.svg" />
                  DockerHub
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.documentationURL"
                  target="_blank">
                  API Docs
                </a>
                <br>

                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_client"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  client
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_client" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_webservices"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  web-services
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_webservices" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_responder"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  responder
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_responder" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_machinereader"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  machine-reader
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_machinereader" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_docqa"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  document-qa
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_docqa" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_docmanager"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  document-manager
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_docmanager" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_splitter"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  splitter
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_splitter" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_apihelpers"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  api-helpers
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_apihelpers" alt="CircleCI" />
                </a>
                <a
                  class="btn btn-docs"
                  v-bind:href="links.githubURL_userdb"
                  target="_blank">
                  <i class="fa fa-github fa-lg btn-fa" aria-hidden="true"></i>
                  userdb
                  <img class="btn-circle-badge" :src="links.circlebadgeURL_userdb" alt="CircleCI" />
                </a>
              </div>
            </div>
          </div>

          <!-- End content -->

          <!-- Demo -->

          <div class="col-lg-6 offset-lg-1 col-md-6 col-sm-12">
            <div class="demo">
              <div class="panel">
                <div class="panel-header">
                  <h6>Copy and paste below</h6>
                  <div class="count">
                    <label>Answer count</label>
                    <cape-landing-dropdown-content-layout
                      horizontalAlign="right"
                      verticalAlign="top"
                      ref="answerCountDropdown">
                      <cape-landing-dropdown-label-trigger
                        slot="trigger"
                        v-bind:label="dropdownModel.label"
                        v-bind:labelColor="color.BLUE_GREY_400"
                        v-bind:caretColor="color.GREY_400"/>
                      <div slot="content">
                        <template v-for="model in dropdownCollection">
                          <cape-landing-dropdown-label-option
                          v-bind:label="model.label"
                          v-on:click.native="_handleDropdownOptionSelect($event, model)"/>
                        </template>
                      </div>
                    </cape-landing-dropdown-content-layout>
                  </div>
                </div>
                <div class="panel-body">
                  <cape-landing-alert-manager
                    ref="alertManager"/>
                  <cape-landing-dashed-container
                    v-bind:strokeColor="dashedContainerStrokeColor"
                    v-bind:horizontalPadding="dashedContainerHorizontalPadding"
                    v-bind:verticalPadding="dashedContainerVerticalPadding">
                    <cape-landing-textarea
                      v-model="textareaValue"
                      ref="textarea"/>
                  </cape-landing-dashed-container>
                </div>
              </div>
              <cape-landing-input
                v-model="inputValue"
                v-bind:placeholder="inputPlaceholder"
                v-bind:progress="inputProgress"
                v-on:input="_handleInputChange"/>
            </div>
          </div>

          <!-- End demo -->

        </div>
      </div>
    </div>

    <!-- End header -->

    <!-- Reference -->

    <div class="reference">
      <div class="background">
        <div class="rectangle-1"></div>
        <div class="rectangle-2"></div>
      </div>
      <div class="container">

        <!-- Heading -->

        <h4>The API makes it easy to build software that<br />answers questions about the contents of documents.</h4>

        <!-- End heading -->

        <!-- Snippet -->

        <div class="row">
          <div class="col">
            <div class="snippet">
              <div class="sidebar">
                1<br />
                2<br />
                3<br />
                4
              </div>
              <div class="canvas">
                <span class="comment"># Run the Cape docker image</span><br/>
                docker run -p 5050:5050 bloomsburyai/cape<br/>
                <span class="comment"># Get answer</span><br/>
                curl 'http://localhost:5050/api/0.1/answer?<span class="key">token</span>=<span class="value">demo</span>&<span class="key">question</span>=<span class="value">Who+heads+the+board?</span>&amp;<span class="key">text</span>=<span class="value">The+board+is+represented+by+the+chairman</span>'
              </div>
            </div>
          </div>
        </div>

        <!-- End snippet -->

        <!-- Content -->

        <div class="row">
          <div class="col-md-8 offset-md-2 col-sm-12">
            <div class="content">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <i class="fa fa-book" aria-hidden="true"></i>
                  <h5>Documentation</h5>
                  <p>Easily plug-and-play machine reading in your own applications.</p>
                  <a
                    class="btn"
                    v-bind:href="links.documentationURL"
                    target="_blank">
                    Read documentation
                  </a>
                </div>
                <div class="col-md-6 col-sm-12">
                  <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
                  <h5>Tutorial</h5>
                  <p>Search your documents in plain english. Analogous to a super CTRL+F shortcut.</p>
                  <a
                    class="btn"
                    target="_blank"
                    v-bind:href="links.tutorialReadURL">
                    Read tutorial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- End content -->

      </div>
    </div>

    <!-- End reference -->

    <!-- Features -->

    <div class="features" id="features">

      <div class="container">

        <!-- Heading -->

        <h4>Features</h4>

        <!-- End heading -->

        <!-- Content -->

        <div class="row">
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-search-plus" aria-hidden="true"></i>
            <h5>Powerful machine reading and reasoning</h5>
            <p><strong>Cape</strong> enables developers to <strong>convert text to knowledge</strong> by applying <strong>powerful deep learning neural network models</strong> in an easy to use API. Simply paste text or upload text documents and ask complex questions like you would to a human and get immediate answers. Let your users <strong>save hours per day</strong> by giving them the power of <strong>machine reading</strong> to make meaning out of text.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            <h5>Powered by machine learning</h5>
            <p>Apply the most advanced deep learning neural network algorithms to your users' text for machine reading. <strong>Cape</strong> has the ability to improve over time and provides the ability to collect annotations and <strong>re-train your models</strong>.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-bolt" aria-hidden="true"></i>
            <h5>Get results immediately</h5>
            <p>Don’t wait hours to process documents and ask questions, <strong>Cape</strong> starts giving results <strong>immediately</strong>. Once processed, your text and documents start to build up a <strong>unique model</strong> and can instantly be queried. The more you ask, the smarter it gets.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
            <h5>Keep improving</h5>
            <p>Keep asking questions and if you fail to find the right answer, <strong>Cape</strong> will quickly learn for the future and become more intelligent. Empower teams of users to build extraordinary knowledge-bases that can handle <strong>complex natural language queries</strong>.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-code-fork" aria-hidden="true"></i>
            <h5>Custom model</h5>
            <p><strong>Cape</strong> provides you with a platform to re-train your machine reading models targeted to your specific needs, ensuring that its <strong>advanced machine reading capability</strong> is effectively transferred to your unique use case.</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <i class="fa fa-code" aria-hidden="true"></i>
            <h5>Works with apps across any device</h5>
            <p><strong>Cape's API supports any device</strong> that can send an HTTP request including phones, PCs, tablets and IoT devices (e.g., cars, TVs, speakers), as demonstrated by the online demos accessible from this website.</p>
          </div>
        </div>

        <!-- End content -->

      </div>
    </div>

    <!-- End features -->

    <!-- Licensing -->

    <div class="licensing" id="licensing">

      <div class="container">

        <!-- Heading -->

        <h4>Licensing</h4>

        <!-- End heading -->

        <!-- Content -->

        <div class="row">
          <div class="col-md-12 col-sm-12">
            <i class="fa fa-balance-scale" aria-hidden="true"></i>
            <h5>Apache License 2.0</h5>
            <p><strong>Cape</strong> is licensed under the Apache License, Version 2.0 (the "License");</p>
            <p>You may not use this file except in compliance with the License. You may obtain a copy of the License at
              <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">http://www.apache.org/licenses/LICENSE-2.0</a>.</p>
            <p>Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.</p>
          </div>
        </div>

        <!-- End content -->

      </div>
    </div>

    <!-- End licensing -->

    <!-- Footer -->

    <div class="footer">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-md-6">
            <div class="resources">
              <span>&copy; Bloomsbury AI</span>
              <a
                href="#"
                v-on:click="_handleCoverOpen($event, 'terms')">
                Terms
              </a>
              <a
                href="#"
                v-on:click="_handleCoverOpen($event, 'privacy')">
                Privacy
              </a>
            </div>
          </div>
          <div class="col-md-6">
            <div class="menu">
              <a href="#">Home</a>
              <a v-bind:href="links.documentationURL">Documentation</a>
              <a v-bind:href="links.licensingURL">Licensing</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End footer -->

    <!-- Covers -->

    <template v-if="coversOpened">
      <div class="covers">
        <template v-if="termsModalOpened">
          <cape-landing-terms-modal
            v-on:close="_handleCoverClose"/>
        </template>
      </div>
    </template>

    <!-- End covers -->

  </div>
</template>

<script>
import $ from 'jquery'
import * as color from '@/color'
import client from '@/client'
import configuration from '@/configuration'

import DashedContainer from '@/components/DashedContainer'
import AlertManager from '@/components/alert/Manager'
import AlertMessage from '@/components/alert/Message'
import Textarea from '@/components/Textarea'
import DropdownContentLayout from '@/components/dropdown/content/Layout'
import DropdownLabelTrigger from '@/components/dropdown/trigger/Label'
import DropdownLabelOption from '@/components/dropdown/option/Label'
import Input from '@/components/Input'
import TermsModal from '@/components/terms/Modal'

export default {

  data () {
    const dropdownCollection = [
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      },
      {
        label: '3',
        value: 3
      }
    ]
    return {
      // expose color to template
      color: color,
      // expose links to the template
      links: configuration.links,
      // user
      userIsLogged: false,
      // dashed container
      dashedContainerStrokeColor: color.GREY_300,
      dashedContainerHorizontalPadding: 0.25,
      dashedContainerVerticalPadding: 0.25,
      // demo
      mark: null,
      textareaValue: 'The domestic cat (Felis silvestris catus or Felis catus) is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines. They are often valued by humans for companionship and for their ability to hunt vermin. There are more than seventy cat breeds recognized by various cat registries. The average lifespan of pet cats has risen in recent years. In the early 1980s, it was about seven years, rising to 9.4 years in 1995 and 15.1 years in 2018. However, cats have been reported as surviving into their 30s, with the oldest known cat, Creme Puff, dying at a verified age of 38. As of a 2007 study, cats are the second-most popular pet in the U.S. by number of pets owned, behind freshwater fish. In a 2010 study, they were ranked the third-most popular pet in the UK, after fish and dogs, with around 8 million being owned.',
      dropdownCollection: dropdownCollection,
      dropdownModel: dropdownCollection[0],
      inputPlaceholder: 'Type a question here',
      inputValue: 'Which is the oldest cat?',
      inputProgress: false,
      // covers
      coversOpened: false,
      termsModalOpened: false
    }
  },

  components: {
    'cape-landing-dashed-container': DashedContainer,
    'cape-landing-alert-manager': AlertManager,
    'cape-landing-textarea': Textarea,
    'cape-landing-dropdown-content-layout': DropdownContentLayout,
    'cape-landing-dropdown-label-trigger': DropdownLabelTrigger,
    'cape-landing-dropdown-label-option': DropdownLabelOption,
    'cape-landing-input': Input,
    'cape-landing-terms-modal': TermsModal
  },

  methods: {
    /**
     *
     * Token
     *
     */

    // _setupToken calls the API to get
    // token values and handles error cases
    _setupToken () {
      client.user.token.query.get((error, value) => {
        if (!error && value) {
          this.userIsLogged = true
        }
      })
    },

    /**
     *
     * Demo
     *
     */

    // _handleDropdownOptionSelect is an event
    // handler triggered when a new count value
    // gets selected
    _handleDropdownOptionSelect (e, model) {
      this.$refs.answerCountDropdown.close()
      this.dropdownModel = model
      this._queryClient()
    },

    // _handleInputChange is an event handler
    // triggered when a new value is inserted
    _handleInputChange (value) {
      this._queryClient()
    },

    _queryClient () {
      const textarea = this.$refs.textarea
      const alertManager = this.$refs.alertManager
      this.inputProgress = true
      alertManager.close()
      client.query.prepare({
        source: client.SOURCE_DOCUMENT,
        target: this.textareaValue,
        content: this.inputValue
      }).paginate({
        size: this.dropdownModel.value
      }, (error, data) => {
        this.inputProgress = false
        if (error) {
          alertManager.open({
            type: AlertMessage.TYPE_ERROR,
            label: error.message
          })
          textarea.reset()
        } else {
          let model = null
          let ranges = []
          let index = 0
          for (let i = 0; i < data.length; i++) {
            model = data[i]
            if (!model) {
              continue
            }
            ranges.push({
              index: index,
              start: model.answerTextStartOffset,
              length: model.answerTextEndOffset - model.answerTextStartOffset
            })
            index++
          }
          if (ranges && ranges.length) {
            textarea.highlight(ranges)
            textarea.scrollToHighlightIndex(0)
          }
        }
      })
    },

    /**
     *
     * Covers
     *
     */

    // _handleCoverOpen
    _handleCoverOpen (e, type) {
      e.stopPropagation()
      e.preventDefault()
      this.coversOpened = true
      this.termsModalOpened = true
      $('body').css('overflow', 'hidden')
    },

    _handleCoverClose () {
      this.coversOpened = false
      this.termsModalOpened = false
      $('body').css('overflow', 'auto')
    }
  },

  mounted () {
    this._setupToken()
    this._queryClient()
  }

}
</script>
