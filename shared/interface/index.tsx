import { UniqueIdentifier } from "@dnd-kit/core"

export interface createForm {
  sTitle: string
  sDescription: string
}

export interface attachField {
    iFieldId: string | UniqueIdentifier
    sFormId: string
  }