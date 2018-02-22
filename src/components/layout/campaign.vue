<template lang="html">
  <Form :ref="i.name"
    class="ivu-form-campaign"
    :model="form"
    :rules="rule"
    @keyup.native="touch">

    <!-- ############################################################### -->
    <!-- Website URL -->
    <FormItem prop="domain">
      <InputGroup icon="ios-world-outline" required
        placeholder="Website URL">

        <Input slot="input" type="textarea"
          v-model="form.domain"
          :autosize="{ minRows: 2 }"
          @keyup.enter.native="spaced"
        />

      </InputGroup>

      <div class="field-info">
        The full website URL (e.g. <code>https://www.example.com</code>)
      </div>
    </FormItem>


    <!-- ############################################################### -->
    <!-- Campaign Source -->
    <FormItem prop="source">
      <InputGroup icon="ios-list-outline" required
        placeholder="Campaign Source">

        <Input slot="input" type="text"
          v-model="form.source"
        />

      </InputGroup>

      <div class="field-info">
        The referrer: (e.g. <code>google</code>, <code>newsletter</code>)
      </div>
    </FormItem>


    <!-- ############################################################### -->
    <!-- Campaign Meduim -->
    <FormItem>
      <InputGroup icon="ios-list-outline"
        placeholder="Campaign Meduim">

        <Input slot="input" type="text"
          v-model="form.medium"
        />

      </InputGroup>

      <div class="field-info">
        Marketing medium: (e.g. <code>cpc</code>, <code>banner</code>, <code>email</code>)
      </div>
    </FormItem>


    <!-- ############################################################### -->
    <!-- Campaign Name -->
    <FormItem>
      <InputGroup icon="ios-list-outline"
        placeholder="Campaign Name">

        <Input slot="input" type="text"
          v-model="form.name"
        />

      </InputGroup>

      <div class="field-info">
        Product, promo code, or slogan (e.g. <code>spring_sale</code>)
      </div>
    </FormItem>


    <!-- ############################################################### -->
    <!-- Campaign Term -->
    <FormItem>
      <InputGroup icon="ios-list-outline"
        placeholder="Campaign Term">

        <Input slot="input" type="text"
          v-model="form.term"
        />

      </InputGroup>

      <div class="field-info">
        Identify the paid keywords
      </div>
    </FormItem>


    <!-- ############################################################### -->
    <!-- Campaign Content -->
    <FormItem>
      <InputGroup icon="ios-list-outline"
        placeholder="Campaign Content">

        <Input slot="input" type="text"
          v-model="form.content"
        />

      </InputGroup>

      <div class="field-info">
        Use to differentiate ads
      </div>
    </FormItem>

  </Form>
</template>

<script>
import verify from '~/components/validator'

function FormData () {
  return {
    form: {
      domain: null,
      source: null,
      medium: null,
      name: null,
      term: null,
      content: null
    },
    rule: {
      domain: [verify.fill, verify.url],
      source: [verify.fill]
    }
  }
}

export default {
  name: 'Campaign',

  data () {
    return {
      ...new FormData(),
      i: {
        name: 'campaign-builder',
        building: null
      }
    }
  },

  methods: {
    touch () {
      const builder = {
        medium:   this.form.medium  ? `&utm_medium=${this.form.medium}`   : '',
        name:     this.form.name    ? `&utm_campaign=${this.form.name}`   : '',
        term:     this.form.term    ? `&utm_term=${this.form.term}`       : '',
        content:  this.form.content ? `&utm_content=${this.form.content}` : '',
        cron:     this.form.domain.search(/[?]/g) < 1 ? '?' : '&'
      }

      this.i.building = `
        ${this.form.domain}
        ${builder.cron}utm_source=${this.form.source}
        ${builder.medium}
        ${builder.name}
        ${builder.term}
        ${builder.content}
      `.replace(/\s/g, '')

      this.$emit('on-emit', this.i.building.trim())
    },

    spaced () {
      this.form.domain = this.form.domain.replace(/\s/g, '')
    }
  }
}
</script>
