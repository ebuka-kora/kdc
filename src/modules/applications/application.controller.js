const { catchAsync } = require('../../utils/catchAsync');
const { ApiError } = require('../../utils/ApiError');
const {
  createApplication,
  listApplications,
  updateApplication,
  deleteApplication,
} = require('./application.service');

const submitApplication = catchAsync(async (req, res) => {
  const application = await createApplication(req.body);
  res.status(201).json(application);
});

const getApplications = catchAsync(async (req, res) => {
  const { status, search } = req.query;
  const applications = await listApplications({ status, search });
  res.status(200).json(applications);
});

const patchApplication = catchAsync(async (req, res) => {
  const updated = await updateApplication(req.params.id, req.body);
  if (!updated) throw new ApiError(404, 'Application not found');
  res.status(200).json(updated);
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
