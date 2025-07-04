import type mongoose from "mongoose";

export interface IOrganization {
  name: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  members: [
    {
      userId: mongoose.Schema.Types.ObjectId;
      role: string;
    }
  ];
  subscription: {
    plan: string;
    status: string;
    validUntil: Date;
  };
}
