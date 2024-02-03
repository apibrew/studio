export const SimpleActionResource = {
  resource: "SimpleAction",
  namespace: "default",
};

// Sub Types

// Resource Type
export interface SimpleAction {
  id: string;
  action: string;
  version: number;

}

// Resource and Property Names
export const SimpleActionName = "SimpleAction";

export const SimpleActionIdName = "Id";

export const SimpleActionActionName = "Action";

export const SimpleActionVersionName = "Version";


