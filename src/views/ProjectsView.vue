<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="dialog = true">Add Project</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Search Projects"
          prepend-icon="mdi-magnify"
          outlined
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="filterStatus"
          :items="statuses"
          label="Filter by Status"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredProjects"
      :search="search"
      class="elevation-1"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small @click="editProject(item)">mdi-pencil</v-icon>
        <v-icon small @click="confirmDelete(item)" class="ml-2"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            editIndex === -1 ? "Add Project" : "Edit Project"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedProject.name"
            label="Project Name"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="editedProject.budget"
            label="Budget (₹)"
            type="number"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-model="editedProject.status"
            :items="statuses"
            label="Status"
            outlined
            dense
          ></v-select>
          <v-slider
            v-model="editedProject.progress"
            label="Progress"
            thumb-label
            always
            min="0"
            max="100"
          ></v-slider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveProject">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>
          This action will permanently delete the project.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" @click="deleteConfirmed">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      filterStatus: "All",
      statuses: ["All", "Pending", "In Progress", "Completed"],
      dialog: false,
      deleteDialog: false,
      editIndex: -1,
      projectToDelete: null,
      headers: [
        { text: "Project Name", value: "name" },
        { text: "Budget (₹)", value: "budget" },
        { text: "Status", value: "status" },
        { text: "Progress (%)", value: "progress" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      projects: [
        {
          name: "Investment Tracker",
          budget: 5000,
          status: "In Progress",
          progress: 60,
        },
        {
          name: "Savings Plan",
          budget: 2000,
          status: "Completed",
          progress: 100,
        },
        {
          name: "Retirement Fund",
          budget: 10000,
          status: "Pending",
          progress: 20,
        },
        {
          name: "Stock Portfolio",
          budget: 15000,
          status: "In Progress",
          progress: 50,
        },
        {
          name: "Debt Repayment",
          budget: 5000,
          status: "Completed",
          progress: 100,
        },
        {
          name: "Emergency Fund",
          budget: 8000,
          status: "In Progress",
          progress: 40,
        },
      ],
      editedProject: { name: "", budget: 0, status: "", progress: 0 },
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(
        (p) => this.filterStatus === "All" || p.status === this.filterStatus
      );
    },
  },
  methods: {
    editProject(item) {
      this.editIndex = this.projects.indexOf(item);
      this.editedProject = Object.assign({}, item);
      this.dialog = true;
    },
    confirmDelete(item) {
      this.projectToDelete = item;
      this.deleteDialog = true;
    },
    deleteConfirmed() {
      this.projects = this.projects.filter((p) => p !== this.projectToDelete);
      this.deleteDialog = false;
      this.projectToDelete = null;
    },
    saveProject() {
      if (this.editIndex === -1) {
        this.projects.push(this.editedProject);
      } else {
        Object.assign(this.projects[this.editIndex], this.editedProject);
      }
      this.dialog = false;
      this.editedProject = { name: "", budget: 0, status: "", progress: 0 };
      this.editIndex = -1;
    },
  },
};
</script>
