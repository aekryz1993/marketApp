import { Link } from "@remix-run/react"
import {PlusIcon} from '@heroicons/react/24/outline'

import { Box } from "../utilities"
import { createListingBoxClasses, createListingLabelClasses, createListingPlusIconClasses } from "./styled"

export const CreateListing = () => {
  return <Link to="/create">
    <Box classes={createListingBoxClasses}>
      <PlusIcon className={createListingPlusIconClasses} />
      <span className={createListingLabelClasses}>Create new listing</span>
    </Box>
  </Link>
}