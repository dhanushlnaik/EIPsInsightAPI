const { application } = require("express");
const express = require("express");
const router = express.Router();

require("../db/conn");
const form = require("../model/formSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from server router.js`);
});
// promise through
// router.post("/register", async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     return res.status(422).json({ error: "plz filled the all section!!" });
//   }

//   form
//     .findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exists" });
//       }
//       const data = new form({ name, email });
//       data.save().then(() => {
//         res
//           .status(201)
//           .json({ message: "user registered successfully" })
//           .catch((err) => res.status(500).json({ error: "failed registered" }));
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
router.get('/register', async (req, res) => {
  const forms = await form.find();
  res.send(forms);
});

router.post('/register', async (req, res) => {
  const {
    name,
    year,
    summary,
    Draft,
    Final,
    Review,
    LastCall,
    Stagnant,
    Withdrawn,
    Living,
    GeneralStats,
    OtherStats,
  } = req.body;
  console.log(req.body);
  console.log(req.body.Draft);
  if (!name) {
    return res.status(422).json({ error: "plz filled the all section!!" });
  }

  try {
    const userExist = await form.findOne({ name: name });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const data = new form({
      name,
      year,
      summary,
      Draft,
      Final,
      Review,
      LastCall,
      Stagnant,
      Withdrawn,
      Living,
      GeneralStats,
      OtherStats,
    });
    const userRegistered = await data.save();

    if (userRegistered) {
      res.status(201).json({ message: "user registered successfully" });
    } else {
      res.status(500).json({ error: "failed registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/update", async (req, res) => {
  const { id, user } = req.body;
  console.log(id);
  console.log(user);

  try {
    await form.findById(id, (err, updateForm) => {
      updateForm.name = user.name;
      updateForm.year = user.year;
      updateForm.summary = user.summary;
      updateForm.Draft = user.Draft;
      updateForm.Final = user.Final;
      updateForm.Review = user.Review;
      updateForm.LastCall = user.LastCall;
      updateForm.Stagnant = user.Stagnant;
      updateForm.Withdrawn = user.Withdrawn;
      updateForm.Living = user.Living;
      updateForm.GeneralStats = user.GeneralStats;
      updateForm.OtherStats = user.OtherStats;
      updateForm.save();
      res.status(200).json({ message: "user registered successfully" });
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
