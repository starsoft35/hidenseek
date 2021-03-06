<template>
    <v-card>
        <v-layout>
            <div class="content-no-padding fill-width">
        <v-toolbar flat color="white">
      <v-toolbar-title class="hidden-xs-only">Usuários</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" class="mb-2">Novo Usuário</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.distinctId" label="Identificador"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      rows-per-page-text="Linhas por página"

    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.distinctId }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2 cursor-pointer"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="cursor-pointer"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Resetar</v-btn>
      </template>
        <template slot="pageText" slot-scope="props">
            Linha {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
    </v-data-table>
    </div>
    </v-layout>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class extends Vue {
  private dialog: boolean = false;
  private headers: any = [
    {
      text: "Nome",
      value: "name"
    },
    {
      text: "Identificador",
      value: "distinctId"
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Ações",
      value: "actions",
      align: "center"
    }
  ];
  private users: any = [];
  private editedIndex: number = -1;
  private search: string = "";
  private editedItem: any = {
    name: "",
    distinctId: "",
    email: ""
  };
  private defaultItem: any = {
    name: "",
    distinctId: "",
    email: ""
  };

  private get formTitle() {
    return this.editedIndex === -1 ? "Novo Usuário" : "Editar Usuário";
  }

  @Watch("dialog")
  private watchDialog(val: any) {
    val || this.close();
  }

  private created() {
    this.initialize();
  }

  private initialize() {
    this.users = [
      {
        name: "Antonio Gonçalves",
        distinctId: "sp1654378",
        email: "antonio@gmail.com"
      },
      {
        name: "Vitor Gabriel Maia",
        distinctId: "sp7654312",
        email: "vgb@gmail.com"
      },
      {
        name: "Letícia Camillo",
        distinctId: "sp6544321",
        email: "leticia@gmail.com"
      }
    ];
  }

  private editItem(item: any) {
    this.editedIndex = this.users.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  private deleteItem(item: any) {
    const index = this.users.indexOf(item);
    confirm("Tem certeza que deseja excluir esse usuário?") &&
      this.users.splice(index, 1);
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    }, 300);
  }

  private save() {
    if (this.editedIndex > -1) {
      Object.assign(this.users[this.editedIndex], this.editedItem);
    } else {
      this.users.push(this.editedItem);
    }
    this.close();
  }
}
</script>

<style>
.content-no-padding .v-toolbar__content {
  padding-right: 0 !important;
}
</style>
