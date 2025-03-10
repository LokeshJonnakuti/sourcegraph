package upgradestore

import (
	"github.com/Masterminds/semver"

	"github.com/sourcegraph/sourcegraph/internal/conf/deploy"
)

// IsValidUpgrade returns true if the given previous and latest versions comply with our
// documented upgrade policy. All roll-backs or downgrades are supported.
//
// See https://docs.sourcegraph.com/#upgrading-sourcegraph.
func IsValidUpgrade(previous, latest *semver.Version) bool {
	// NOTE: Cody App does not need downgrade support and can't have the
	// guarantee of one minor version upgrade at a time. The duration between `brew
	// install sourcegraph` and `brew upgrade sourcegraph` could be months apart.
	if deploy.IsApp() {
		return true
	}

	switch {
	case previous == nil || latest == nil:
		return true
	case previous.Major() > latest.Major():
		return true
	case previous.Major() == latest.Major():
		return previous.Minor() >= latest.Minor() ||
			previous.Minor() == latest.Minor()-1
	case previous.Major() == latest.Major()-1:
		return latest.Minor() == 0
	default:
		return false
	}
}
