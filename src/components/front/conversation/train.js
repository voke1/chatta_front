  const tree = [
    {
      identity: "95bebaa0-0de8-11ea-ad77-e78eca50f5f34",
      prompt:
        "What entity would you like to train your bot to recognize ? E.g reply with name if you want your bot to be able to recognize names in user's inputs",
      response: {
        buttons: [],
        text: "95bebaa0-0de8-11ea-ad77-e78eca50f5f3",
        type: "entity"
      }
    },
    {
      identity: "95bebaa0-0de8-11ea-ad77-e78eca50f5f3",
      prompt:
        "What entity would you like to train your bot to recognize ? E.g reply with name if you want your bot to be able to recognize names in user's inputs",
      response: {
        buttons: [],
        text: "96ca1020-0de8-11ea-ad77-e78eca50f5f3",
        type: "entity"
      }
    },
    {
      identity: "96ca1020-0de8-11ea-ad77-e78eca50f5f3",
      prompt:
        "Enter a sentence containing a 'name' whose pattern you want the bot to be able to extract 'name' from",
      response: {
        buttons: [],
        text: "b03b1fe0-0de8-11ea-ad77-e78eca50f5f3",
        type: "sentence"
      }
    },
    {
      identity: "b03b1fe0-0de8-11ea-ad77-e78eca50f5f3",
      prompt: "Perfect! Now enter the name contained in the sentence above",
      response: {
        buttons: [],
        text: "d9a7ad80-0de8-11ea-ad77-e78eca50f5f3",
        type: "value"
      }
    },
    {
      identity: "d9a7ad80-0de8-11ea-ad77-e78eca50f5f3",
      prompt: "Successfully learned new the pattern !",
      response: {
        buttons: [
          {
            key: "96ca1020-0de8-11ea-ad77-e78eca50f5f3",
            val: "Add More"
          },
          {
            key: "95bebaa0-0de8-11ea-ad77-e78eca50f5f3",
            val: "New entity"
          },
          {
            key: "95bebaa0-0de8-11ea-ad77-e78eca50f5f8",
            val: "End training"
          }
        ],
        text: "",
        type: "success"
      }
    },
    {
      identity: "95bebaa0-0de8-11ea-ad77-e78eca50f5f8",
      prompt:
        "Saving your training data globally will give other bots hosted on chatta access to your training data",
      response: {
        buttons: [
          {
            key: "25655380-0de9-11ea-ad77-e78eca50f5f3",
            val: "Save globally"
          },
          {
            key: "25655380-0de9-11ea-ad77-e78eca50f5f3",
            val: "Save locally"
          }
        ],
        text: ""
      }
    },
    {
      identity: "25655380-0de9-11ea-ad77-e78eca50f5f3",
      prompt: "Your training data has been saved",
      response: {
        buttons: [
          {
            key: "3b92d100-0de9-11ea-ad77-e78eca50f5f3",
            val: "Exit"
          }
        ],
        text: ""
      }
    },
    {
      identity: "3b92d100-0de9-11ea-ad77-e78eca50f5f3",
      prompt: "Life insurance are of two types",
      response: {
        buttons: [
          {
            key: "5b93dee0-0de9-11ea-ad77-e78eca50f5f3",
            val: "Family"
          },
          {
            key: "5fc6da30-0de9-11ea-ad77-e78eca50f5f3",
            val: "Individual"
          }
        ],
        text: ""
      }
    },
    {
      identity: "41292ce0-0de9-11ea-ad77-e78eca50f5f3",
      prompt: "Health Insurance are of two types",
      response: {
        buttons: [
          {
            key: "70303510-0de9-11ea-ad77-e78eca50f5f3",
            val: "Family"
          },
          {
            key: "743bf950-0de9-11ea-ad77-e78eca50f5f3",
            val: "Individual"
          }
        ],
        text: ""
      }
    },
    {
      identity: "4e30bf20-0de9-11ea-ad77-e78eca50f5f3",
      prompt: "Car insurance is of two types",
      response: {
        buttons: [
          {
            key: "8457d070-0de9-11ea-ad77-e78eca50f5f3",
            val: "Comprehensive"
          },
          {
            key: "88963d70-0de9-11ea-ad77-e78eca50f5f3",
            val: "Third party"
          }
        ],
        text: ""
      }
    },
    {
      identity: "9f1d4210-0de8-11ea-ad77-e78eca50f5f3",
      prompt: "Our Mortgage services are of two types",
      response: {
        buttons: [
          {
            key: "b5284e00-0de9-11ea-ad77-e78eca50f5f3",
            val: "Land"
          },
          {
            key: "bba36490-0de9-11ea-ad77-e78eca50f5f3",
            val: "House"
          }
        ],
        text: ""
      }
    },
    {
      identity: "empty",
      prompt:
        "Sorry I don't understand what you said. Would you like to know about the following?",
      response: {
        buttons: [
          {
            key: "96ca1020-0de8-11ea-ad77-e78eca50f5f3",
            val: "Loan"
          },
          {
            key: "99b79320-0de8-11ea-ad77-e78eca50f5f3",
            val: "Insurance"
          },
          {
            key: "9f1d4210-0de8-11ea-ad77-e78eca50f5f3",
            val: "Mortgage"
          }
        ],
        text: ""
      }
    },
    {
      identity: "delay_prompt",
      prompt:
        "Hello, are you still there?... You can check out the various types of life insurance we offer:",
      response: {
        buttons: [
          {
            key: "96ca1020-0de8-11ea-ad77-e78eca50f5f3",
            val: "Loan"
          },
          {
            key: "99b79320-0de8-11ea-ad77-e78eca50f5f3",
            val: "Insurance"
          },
          {
            key: "9f1d4210-0de8-11ea-ad77-e78eca50f5f3",
            val: "Mortgage"
          }
        ],
        text: ""
      }
    }
  ];

export default tree;
