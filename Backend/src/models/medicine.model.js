import mongoose,{Schema} from "mongoose";



const medicineSchema = new Schema({
  medicine_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  offer_price: {
    type: Number,
    required: true
  },
  quantity_available: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  dosage_form: {
    type: String,
    required: true
  },
  packaging: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true
      },
      strength: {
        type: String,
        required: true
      }
    }
  ],
  usage: [
    {
      type: String,
      required: true
    }
  ],
  side_effects: [
    {
      type: String,
      required: true
    }
  ],
  warnings: [
    {
      type: String,
      required: true
    }
  ],
  manufacturer: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  expiry_date: {
    type: String,
    required: true
  },
  storage_instructions: {
    type: String,
    required: true
  },
  product_image: {
    type: String,
    required: true
  },
  country_of_origin: {
    type: String,
    required: true
  }
});

export const Medicine=new mongoose.model('Medicine',medicineSchema)