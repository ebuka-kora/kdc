const { Application } = require('./application.model');

async function createApplication(data) {
  return Application.create(data);
}

async function listApplications(filters) {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    const regex = new RegExp(filters.search, 'i');
    query.$or = [{ full_name: regex }, { email: regex }, { role: regex }];
  }

  return Application.find(query).sort({ created_at: -1 }).lean();
}

async function getApplicationById(id) {
  return Application.findById(id);
}

async function updateApplication(id, data) {
  return Application.findByIdAndUpdate(id, data, { new: true });
}

async function deleteApplication(id) {
  const result = await Application.findByIdAndDelete(id);
  return result !== null;
}

module.exports = {
  createApplication,
  listApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
