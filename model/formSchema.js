const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  summary: {
    Draft: {
      type: String,
      default: 0,
    },
    Final: {
      type: String,
      default: 0,
    },
    LastCall: {
      type: String,
      default: 0,
    },
    Review: {
      type: String,
      default: 0,
    },
    Stagnant: {
      type: String,
      default: 0,
    },
    Withdrawn: {
      type: String,
      default: 0,
    },
    Living: {
      type: String,
      default: 0,
    },
    SummaryInfo: {
      type: String,
      default: 0,
    },
    HighlightText: {
      type: String,
      default: 0,
    },
  },
  Draft: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  Final: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  Review: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  LastCall: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  Stagnant: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  Withdrawn: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  Living: {
    Core: {
      type: String,
      default: 0,
    },
    ERC: {
      type: String,
      default: 0,
    },
    Networking: {
      type: String,
      default: 0,
    },
    Interface: {
      type: String,
      default: 0,
    },
  },
  GeneralStats: {
    OpenPR: {
      type: String,
      default: 0,
    },
    MergedPR: {
      type: String,
      default: 0,
    },
    ClosedIssues: {
      type: String,
      default: 0,
    },
    NewIssues: {
      type: String,
      default: 0,
    },
  },
  OtherStats: {
    Forks: {
      type: String,
      default: 0,
    },
    Users: {
      type: String,
      default: 0,
    },
    Authors: {
      type: String,
      default: 0,
    },
    Files: {
      type: String,
      default: 0,
    },
  },
});

const Form = mongoose.model("MONTH", formSchema);

module.exports = Form;
