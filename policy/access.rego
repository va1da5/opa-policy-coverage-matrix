package access

import data.groups

default allow = false

permissions_map := {
	"account_managers": ["account_create", "account_view", "account_update", "account_delete"],
	"quality_assurance": ["account_view", "post_view", "post_update"],
	"publishers": ["post_create", "post_view"],
	"post_managers": ["post_create", "post_view", "post_update", "post_delete"],
}

allow {
	group := data.groups[_]
	group.name == "admin"
	input.user == group.members[_]
}

allow {
	group := data.groups[_]
	allowed_permissions = permissions_map[group.name]
	input.user == group.members[_]
	input.permission == allowed_permissions[_]
}
