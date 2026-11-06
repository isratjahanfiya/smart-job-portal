
import { useEffect, useState } from "react";
import "../styles/adminCompanies.css";

const API = "http://localhost:5000/api/admin/companies";

export default function AdminCompanyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadRequests() {
    try {
      setError("");

      const token = sessionStorage.getItem("sc-token");

      if (!token) {
        throw new Error("Please log in as an administrator.");
      }

      const response = await fetch(`${API}/requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load company requests."
        );
      }

      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function reviewCompany(requestId, status) {
    const action = status === "approved" ? "approve" : "reject";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this company?`
      )
    ) {
      return;
    }

    setProcessingId(requestId);
    setMessage("");
    setError("");

    try {
      const token = sessionStorage.getItem("sc-token");

      const response = await fetch(
        `${API}/requests/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Verification failed."
        );
      }

      setMessage(data.message);
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <section className="sc-admin-companies">
      <div className="sc-admin-heading">
        <div>
          <h2>Company Verification</h2>
          <p>
            Review company registration requests
            before allowing recruiters to publish vacancies.
          </p>
        </div>

        <button
          type="button"
          onClick={loadRequests}
          disabled={loading || processingId !== null}
        >
          Refresh
        </button>
      </div>

      {error && (
        <p className="sc-admin-error" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="sc-admin-success" role="status">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading company requests...</p>
      ) : requests.length === 0 ? (
        <p>No company requests found.</p>
      ) : (
        <div className="sc-admin-company-grid">
          {requests.map((request) => (
            <article
              key={request.request_id}
              className="sc-admin-company-card"
            >
              <div className="sc-admin-card-top">
                <h3>{request.name}</h3>
                <span className="sc-admin-status">
                  {request.request_status}
                </span>
              </div>

              <p><strong>Industry:</strong> {request.industry}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <p><strong>Email:</strong> {request.email}</p>
              <p>
                <strong>Company verification:</strong>{" "}
                {request.verification_status}
              </p>
              <p>
                <strong>Recruiter ID:</strong>{" "}
                {request.requester_id}
              </p>

              {request.request_status === "pending" && (
                <div className="sc-admin-actions">
                  <button
                    type="button"
                    className="sc-admin-approve"
                    disabled={processingId !== null}
                    onClick={() =>
                      reviewCompany(
                        request.request_id,
                        "approved"
                      )
                    }
                  >
                    {processingId === request.request_id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    type="button"
                    className="sc-admin-reject"
                    disabled={processingId !== null}
                    onClick={() =>
                      reviewCompany(
                        request.request_id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
