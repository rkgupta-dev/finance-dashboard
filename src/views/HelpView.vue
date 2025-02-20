<template>
  <v-container>
    <v-card outlined class="pa-4">
      <v-card-title class="text-h5 font-weight-bold"
        >Help & Support</v-card-title
      >
      <v-divider class="mb-4"></v-divider>

      <!-- Search Bar -->
      <v-text-field
        v-model="search"
        label="Search for help..."
        outlined
        prepend-inner-icon="mdi-magnify"
        clearable
      ></v-text-field>

      <v-divider class="my-4"></v-divider>

      <!-- Frequently Asked Questions (FAQ) -->
      <p class="text-subtitle-1 font-weight-bold">Frequently Asked Questions</p>
      <v-expansion-panels>
        <v-expansion-panel v-for="(faq, index) in filteredFAQs" :key="index">
          <v-expansion-panel-header>{{
            faq.question
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>{{
            faq.answer
          }}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider class="my-4"></v-divider>

      <!-- Troubleshooting -->
      <p class="text-subtitle-1 font-weight-bold">Troubleshooting</p>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(step, index) in troubleshootingSteps"
            :key="index"
          >
            <v-list-item-icon>
              <v-icon color="primary">mdi-check-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ step }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <!-- Help Articles -->
      <p class="text-subtitle-1 font-weight-bold">Help Articles</p>
      <v-list>
        <v-list-item
          v-for="(article, index) in helpArticles"
          :key="index"
          @click="openArticle(article.link)"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-file-document-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ article.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <!-- Video Tutorials -->
      <p class="text-subtitle-1 font-weight-bold">Video Tutorials</p>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(video, index) in tutorialVideos"
          :key="index"
        >
          <iframe
            width="100%"
            height="200"
            :src="video.link"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <p class="text-body-2 mt-2">{{ video.title }}</p>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Contact Support -->
      <p class="text-subtitle-1 font-weight-bold">Need More Help?</p>
      <v-row>
        <v-col cols="4">
          <v-btn block color="primary" outlined @click="contactEmail"
            >Email Support</v-btn
          >
        </v-col>
        <v-col cols="4">
          <v-btn block color="success" @click="openLiveChat">Live Chat</v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn block color="orange" @click="callSupport">Call Support</v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Community Forum -->
      <p class="text-subtitle-1 font-weight-bold">Community Forum</p>
      <v-btn block color="blue" outlined @click="openForum"
        >Join the Discussion</v-btn
      >

      <v-divider class="my-4"></v-divider>

      <!-- Submit a Support Ticket -->
      <p class="text-subtitle-1 font-weight-bold">Report an Issue</p>
      <v-btn block color="red" @click="openTicketDialog"
        >Submit a Support Ticket</v-btn
      >

      <!-- Support Ticket Dialog -->
      <v-dialog v-model="ticketDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h6">Submit a Support Ticket</v-card-title>
          <v-card-text>
            <v-text-field
              label="Subject"
              v-model="ticket.subject"
              outlined
              dense
            ></v-text-field>
            <v-textarea
              label="Describe your issue"
              v-model="ticket.description"
              outlined
              dense
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="ticketDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="submitTicket">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      faqs: [
        {
          question: "How do I reset my password?",
          answer: "Go to Settings > Security and click 'Change Password'.",
        },
        {
          question: "How do I update my billing information?",
          answer: "Go to Settings > Billing and update your details.",
        },
        {
          question: "Can I change my subscription plan?",
          answer:
            "Yes, go to Settings > Membership to upgrade or downgrade your plan.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can email us at support@financeapp.com or use the live chat option.",
        },
      ],
      troubleshootingSteps: [
        "Check your internet connection.",
        "Ensure your browser is updated.",
        "Try logging out and logging back in.",
        "Clear your browser cache and cookies.",
        "Restart your device and try again.",
      ],
      helpArticles: [
        {
          title: "Understanding Your Dashboard",
          link: "https://example.com/article1",
        },
        { title: "How to Set a Budget", link: "https://example.com/article2" },
        {
          title: "Managing Transactions",
          link: "https://example.com/article3",
        },
      ],
      tutorialVideos: [
        {
          title: "Getting Started with Finance Dashboard",
          link: "https://www.youtube.com/embed/videoID1",
        },
        {
          title: "How to Track Expenses",
          link: "https://www.youtube.com/embed/videoID2",
        },
      ],
      ticketDialog: false,
      ticket: {
        subject: "",
        description: "",
      },
    };
  },
  computed: {
    filteredFAQs() {
      if (!this.search) return this.faqs;
      return this.faqs.filter((faq) =>
        faq.question.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    contactEmail() {
      window.location.href = "mailto:support@financeapp.com";
    },
    openLiveChat() {
      alert("Live chat support coming soon!");
    },
    callSupport() {
      alert("Call support at +1-800-123-4567.");
    },
    openForum() {
      window.open("https://community.financeapp.com", "_blank");
    },
    openTicketDialog() {
      this.ticketDialog = true;
    },
    submitTicket() {
      alert("Your support ticket has been submitted.");
      this.ticketDialog = false;
    },
  },
};
</script>
