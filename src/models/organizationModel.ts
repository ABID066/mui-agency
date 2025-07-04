import mongoose, { Model } from "mongoose";
import organizationSchema from "@/schemas/organization.schema";
import { IOrganization } from "@/types/organization.types"; 

const Organization: Model<IOrganization> =
  mongoose.models.organization || mongoose.model<IOrganization>("organization", organizationSchema);

export default Organization;
