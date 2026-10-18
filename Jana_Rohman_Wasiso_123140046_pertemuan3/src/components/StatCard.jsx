import PropTypes from "prop-types";

function StatCard({ icon, value, label, tone = "violet" }) {
  return <article className="stat-card"><span className={`stat-icon ${tone}`}>{icon}</span><div><strong>{value}</strong><p>{label}</p></div></article>;
}

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(["violet", "orange", "mint", "rose"])
};

export default StatCard;
