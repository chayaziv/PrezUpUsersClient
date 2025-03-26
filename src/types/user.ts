export interface UserType {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  company: string;
  yearsOfExperience: number;
  compareWithOthers: boolean;
  allowPublicPresentations: boolean;
  accountStatus: string;
}

export const initialUserState: UserType = {
  name: "",
  email: "",
  password: "",
  jobTitle: "",
  company: "",
  yearsOfExperience: 0,
  compareWithOthers: false,
  allowPublicPresentations: false,
  accountStatus: "",
};
