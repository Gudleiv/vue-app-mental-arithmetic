<template>
    <b-row>
      <b-col cols="4" class="px-4">
        <b-navbar class="px-0">
          <b-nav pills vertical style="width:100%">
            <div v-for="c in categories" :key="c.id">
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
          <abacus-exercises-editor v-if="catId" :catId="catId"/>
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
          <form @submit.stop.prevent="editCategory">
            <b-form-group
                label="Название категории"
                label-for="category-name-input"
                invalid-feedback="Введите название категории"
                :state="validate('newName')"
            >
              <b-form-input
                  :placeholder="defaultNewName"
                  ref="category-name-input"
                  id="category-name-input"
                  v-model="$v.newName.$model"
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
                  <b-button class="mr-1" variant="outline-secondary" @click="cancel()">
                    Cancel
                  </b-button>
                  <b-button variant="success" @click="!$v.newName.$invalid ? ok() : $v.newName.$touch()">
                    OK
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
      newName: '',
      defaultNewName: 'Новая категория'
    }
  },
  methods: {
    addCategory() {
      this.$store.dispatch('addCategory', this.defaultNewName)
      const lastId = this.categories[this.categories.length - 1].id
      this.catId = lastId
      this.showModal()
    },
    editCategory() {
      if (!this.newName.trim()) {
        this.newName = this.defaultNewName
      }
      const newData = {
        id: this.catId,
        name: this.newName
      }
      this.$store.dispatch('editCategory', newData)
      this.hideModal()
    },
    deleteCategory() {
      const del = () => {
        this.$store.dispatch('deleteCategory', this.catId)
        this.catId = null
        this.hideModal()
      }
      if (this.currentCategory.exercises.length === 0) del()
      else {
        this.confirmModal().then(confirm => {
          if (confirm) del()
        })
      }
    },
    showModal() {
      this.$refs['category-modal'].show()
      this.newName = this.currentCategory.name
    },
    shownModal() {
      this.$refs['category-name-input'].focus()
      this.$refs['category-name-input'].select()
    },
    hideModal() {
      this.$refs['category-modal'].hide()
      this.newName = ''
    },
    confirmModal() {
      return this.$bvModal.msgBoxConfirm(`Упражнения (${this.currentCategory.exercises.length}) из данной категории будут также удалены`, {
        title: `Удаление категории "${this.currentCategory.name}"`,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'OK',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            return value
          })
          .catch(err => {
            // An error occurred
          })
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categoriesList
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
