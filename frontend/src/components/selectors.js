// src/components/selectors.js

import { createSelector } from 'reselect'

const getUserRole = (state) => state.user.role
const getTemplates = (state) => state.templates
const getSidebarState = (state) => state.sidebar

export const getSelectedMenus = createSelector(
    [getUserRole, getTemplates],
    (role, templates) => {
        console.log("User Role:", role); // Log the user's role
        console.log("Templates:", templates); // Log the templates array
        const template = templates.find(template => template.role === role)
        console.log("Selected Template:", template); // Log the selected template
        return template ? template.selectedMenus : []
    }
)

export const getSidebarShow = createSelector(
    [getSidebarState],
    (sidebar) => sidebar.show
)

export const getSidebarUnfoldable = createSelector(
    [getSidebarState],
    (sidebar) => sidebar.unfoldable
)
