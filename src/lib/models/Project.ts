import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  cats: string[];
  location: string;
  year: string;
  area: string;
  duration: string;
  scope: string[];
  hero: string;
  poster: string;
  images: { src: string; cap: string; tall?: boolean }[];
  description: string[];
  mood: { name: string; tone: string }[];
  materials: string[];
  furniture: { piece: string; maker: string; room: string }[];
  video?: string;
}

const ProjectSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  index: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String },
  cats: [{ type: String }],
  location: { type: String },
  year: { type: String },
  area: { type: String },
  duration: { type: String },
  scope: [{ type: String }],
  hero: { type: String },
  poster: { type: String },
  images: [{ 
    src: { type: String }, 
    cap: { type: String }, 
    tall: { type: Boolean } 
  }],
  description: [{ type: String }],
  mood: [{ 
    name: { type: String }, 
    tone: { type: String } 
  }],
  materials: [{ type: String }],
  furniture: [{ 
    piece: { type: String }, 
    maker: { type: String }, 
    room: { type: String } 
  }],
  video: { type: String },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
