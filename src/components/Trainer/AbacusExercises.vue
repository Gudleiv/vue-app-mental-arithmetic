<template>
    <b-row>
      <b-col cols="4" class="px-4">
        <b-navbar class="px-0">
          <b-nav pills vertical style="width:100%">
            <div v-for="c in categories">
              <b-nav-item
                  :active="catId === c.id"
                  active-class="active"
                  @click="catId = c.id"
                  link-classes="categories-list"
              >{{ c.name }}
                <button @click="showModal" v-show="catId === c.id" class="categories-item-edit"><b-icon icon="pencil"></b-icon></button>
              </b-nav-item>
            </div>

          </b-nav>
        </b-navbar>
        <div class="text-center">
          <b-button
              pill
              style="padding:0;width:24px;height:24px"
              variant="outline-primary"
              @click="addCategory"
          ><b-icon icon="plus"></b-icon></b-button>
          <p class="my-2" v-if="!categories.length">Добавьте первую категорию</p>
        </div>
      </b-col>

      <b-col cols="8">
        <transition  name="component-fade" mode="out-in">
          <abacus-exercises-editor v-if="catId" :id="catId"/>
        </transition>
      </b-col>

        <b-modal
            title="Категория"
            id="modal-prevent-closing"
            ref="category-modal"
            @show="showModal"
            @shown="shownModal"
            @hidden="hideModal"
            @ok="editCategory"
        >
          <form ref="form" @submit.stop.prevent="editCategory">
            <b-form-group
                label="Название категории"
                label-for="name-input"
                invalid-feedback="Error message"
                :state="validate('newName')"
            >
              <b-form-input
                  ref="focusInput"
                  id="name-input"
                  v-model="newName"
                  :state="validate('newName')"
                  required
              ></b-form-input>
            </b-form-group>
          </form>
          <template #modal-footer="{ok, cancel}">
            <div class="container">
              <div class="row">
                <div class="col px-0">
                  <b-button variant="outline-danger" @click="deleteCategory">
                    Delete
                  </b-button>
                </div>
                <div class="col text-right px-0">
                  <b-button class="mr-1" variant="success" @click="ok()">
                    OK
                  </b-button>
                  <b-button variant="outline-secondary" @click="cancel()">
                    Cancel
                  </b-button>
                </div>
              </div>
            </div>
          </template>
        </b-modal>
    </b-row>
</template>

<script>
import AbacusExercisesEditor from './AbacusExercisesEditor'
import { validateState } from '@/utils'
import { required } from 'vuelidate/lib/validators'

export default {
  created() {
    this.validate = validateState(this.$v)
  },
  components: {
    AbacusExercisesEditor
  },
  data() {
    return {
      catId: null,
      newName: ''
    }
  },
  methods: {
    addCategory() {
      this.$store.dispatch('addCategory', 'Новая категория')
      const lastId = this.categories[this.categories.length - 1].id
      this.catId = lastId
      this.showModal()
    },
    editCategory() {
      const newData = {
        id: this.catId,
        name: this.newName
      }
      this.$store.dispatch('editCategory', newData)
      this.hideModal()
    },
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.catId)
      this.catId = null
      this.hideModal()
    },
    showModal() {
      this.$refs['category-modal'].show()
      this.newName = this.currentCategory.name
    },
    shownModal() {
      this.$refs.focusInput.focus()
    },
    hideModal() {
      this.$refs['category-modal'].hide()
      this.newName = ''
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    currentCategory() {
      return this.$store.getters.category(this.catId)
    }
  },
  validations: {
      newName: {
        required,
      }
  }
}
</script>

<style>
.nav-link.categories-list {
  padding-top: 2px;
  padding-bottom: 2px;
  position: relative;
}
.categories-item-edit {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  height: 100%;
}

.categories-item-edit:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.categories-item-edit svg {
  color: white;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
