<template>
  <div class="container">
    <div class="row row-cols-md-2">
      <div class="col-12 col-md-5 px-4">
        <b-navbar class="px-0">
          <b-nav pills vertical style="width:100%">
            <div v-for="c in categories" :key="c.id">
              <b-nav-item
                  :active="catId === c.id"
                  active-class="active"
                  @click="catId = c.id"
                  link-classes="categories-list"
              >{{ c.name }}
                <button @click="onClickEditCategory" v-show="catId === c.id" class="categories-item-edit"><b-icon icon="pencil"></b-icon></button>
              </b-nav-item>
            </div>

          </b-nav>
        </b-navbar>
        <div class="text-center">
          <b-button
              pill
              style="padding:0;width:24px;height:24px"
              variant="outline-primary"
              @click="onClickNewCategory"
          ><b-icon icon="plus"></b-icon></b-button>
          <p class="my-2" v-if="!categories.length">Добавьте первую категорию</p>
        </div>
      </div>

      <div class="col-12 col-md-7">
        <transition  name="component-fade" mode="out-in">
          <abacus-exercises-editor v-if="catId" :catId="catId"/>
        </transition>
      </div>

        <b-modal
            title="Категория"
            id="modal-prevent-closing"
            ref="category-modal"
            @show="showModal"
            @shown="shownModal"
            @hidden="hideModal"
            @ok="okModal"
        >
          <form @submit.stop.prevent="okModal">
            <b-form-group
                label="Название категории"
                label-for="category-name-input"
                invalid-feedback="Введите название категории, не более 40 символов"
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
                  <b-button variant="outline-danger" v-if="!isANewCategory" @click="deleteCategory">
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
    </div>
  </div>
</template>

<script>
import AbacusExercisesEditor from './AbacusExercisesEditor'
import { validateState } from '@/utils'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  created() {
    this.validate = validateState(this.$v)
    this.$store.dispatch('fetchCategories')
  },
  components: {
    AbacusExercisesEditor
  },
  data() {
    return {
      catId: null,
      newName: '',
      isANewCategory: false,
      defaultNewName: 'Новая категория'
    }
  },
  methods: {
    addCategory() {
      this.$store.dispatch('addCategory', this.newName)
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
    onClickNewCategory() {
      this.isANewCategory = true
      this.showModal()
      this.newName = ''
    },
    onClickEditCategory() {
      this.isANewCategory = false
      this.showModal()
      this.newName = this.currentCategory.name
    },
    okModal() {
      this.isANewCategory ? this.addCategory() : this.editCategory()
      this.hideModal()
    },
    showModal() {
      this.$refs['category-modal'].show()
    },
    shownModal() {
      this.$refs['category-name-input'].focus()
      this.$refs['category-name-input'].select()
    },
    hideModal() {
      this.$refs['category-modal'].hide()
      this.newName = ''
      this.$v.newName.$reset()
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
        maxLength: maxLength(40)
      }
  }
}
</script>

<style>
.nav-link.categories-list {
  padding-top: 2px;
  padding-bottom: 2px;
  position: relative;
  overflow-wrap: anywhere;
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
