const { catchAsync } = require('../../utils/catchAsync');
const { Types } = require('mongoose');
const { ApiError } = require('../../utils/ApiError');
const {
  createApplication,
  listApplications,
  updateApplication,
  deleteApplication,
} = require('./application.service');

const toApplicationDto = (doc) => {
  const createdAtValue = doc.createdAt ?? doc.created_at ?? null;
  return {
    id: String(doc._id),
    _id: String(doc._id),
    full_name: doc.full_name,
    email: doc.email,
    role: doc.role,
    experience_level: doc.experience_level,
    reason: doc.reason,
    linkedin_url: doc.linkedin_url ?? null,
    github_url: doc.github_url ?? null,
    status: doc.status,
    created_at: createdAtValue?.toISOString?.() ?? createdAtValue,
  };
};

const submitApplication = catchAsync(async (req, res) => {
  const application = await createApplication(req.body);
  res.status(201).json(application);
});

const getApplications = catchAsync(async (req, res) => {
  const { status, search } = req.query;
  const applications = await listApplications({ status, search });
  res.status(200).json(applications.map(toApplicationDto));
});

const patchApplication = catchAsync(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid value for field: _id' });
    return;
  }

  const updated = await updateApplication(req.params.id, req.body);
  if (!updated) throw new ApiError(404, 'Application not found');
  res.status(200).json(toApplicationDto(updated));
});

const removeApplication = catchAsync(async (req, res) => {
  const deleted = await deleteApplication(req.params.id);
  if (!deleted) throw new ApiError(404, 'Application not found');
  res.status(204).send();
});

module.exports = {
  submitApplication,
  getApplications,
  patchApplication,
  removeApplication,
};
